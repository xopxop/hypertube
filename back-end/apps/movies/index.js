import express from 'express';
import cors from 'cors';
import { PORT, GATEWAY_SERVICE_PORT } from './config.js';
import { Movie } from '../../db/models/movie.model.js';
import WebTorrent from 'webtorrent';

const client = new WebTorrent();

// Middleware to restrict access to only localhost:3000 (gateway)
const restrictToGateway = (req, res, next) => {
  const host = req.headers['host'];
  const referer = req.headers['referer'];
  const origin = req.headers['origin'];
  const xForwardedHost = req.headers['x-forwarded-host'];
  
  const isFromGateway = xForwardedHost === 'localhost:3000' || 
                       (referer && referer.includes('localhost:3000')) ||
                       (origin && origin.includes('localhost:3000'));
  
  if (isFromGateway) {
    console.log(`✅ Authorized request from gateway (localhost:3000)`);
    return next();
  }
  
  console.log(`❌ Blocked request - Only localhost:3000 (gateway) access allowed`);
  res.status(403).json({ 
    error: 'Forbidden: Direct access not allowed.',
    details: 'This service only accepts requests from localhost:3000 (gateway service).'
  });
};

const app = express();
app.set('trust proxy', true); // Trust proxy headers for IP detection
app.use(cors());
app.use(express.json());
app.use(restrictToGateway);

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.findAll();
    console.log('📽️ Fetched movies:', movies);
    res.json(movies);
  } catch (error) {
    console.error('❌ Error fetching movies:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/movie', async (req, res) => {
  const { title, year, genre, rating, posterUrl, magnetLink, description, duration } = req.body;
  if (!title || !year || !genre || genre.length === 0 || !rating || !posterUrl || !description || !duration || !magnetLink) {
    return res.status(400).send('All fields are required');
  };
  try {
    const newMovie = await Movie.create({
      title,
      year,
      genre,
      rating,
      posterUrl,
      magnetLink,
      description,
      duration
    });
    res.status(201).json(newMovie);
  } catch (error) {
    console.error('❌ Error creating movie:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/movie/:id', async (req, res) => {
  const { id } = req.params;
  const { title, year, genre, rating, posterUrl, magnetLink, description, duration } = req.body;
  if (!title || !year || !genre || genre.length === 0 || !rating || !posterUrl || !description || !duration || !magnetLink) {
    return res.status(400).send('All fields are required');
  }
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).send('Movie not found');
    }
    await Movie.update(id, {
      title,
      year,
      genre,
      rating,
      posterUrl,
      magnetLink,
      description,
      duration
    });
    res.json(movie);
  } catch (error) {
    console.error('❌ Error updating movie:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/stream', (req, res) => {
  const magnet = req.query.magnet;
  if (!magnet) return res.status(400).send('Missing magnet link');

  console.log('📡 Received magnet:', magnet);

  // Add torrent
  client.add(magnet, (torrent) => {
    const file = torrent.files.find(f => f.name.endsWith('.mp4'));

    if (!file) {
      console.error('❌ No video file found in torrent');
      return res.status(404).send('No playable video found');
    }

    console.log(`🎥 Streaming: ${file.name}`);
    res.writeHead(200, {
      'Content-Type': 'video/mp4',
    });

    const stream = file.createReadStream();
    stream.pipe(res);

    stream.on('error', err => {
      console.error('❌ Stream error:', err);
      res.status(500).end();
    });

    res.on('close', () => {
      console.log('🔌 Client disconnected, destroying torrent');
      torrent.destroy();
    });
  });

  client.on('error', err => {
    console.error('❌ Client error:', err);
    res.status(500).send('Torrent client error');
  });
});

app.listen(PORT, () => {
  console.log(`✅ MOVIE SERVICE running on http://localhost:${PORT}`);
});
