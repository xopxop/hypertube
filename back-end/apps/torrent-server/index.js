import express from 'express';
import WebTorrent from 'webtorrent';

const app = express();
const PORT = 3000;

const client = new WebTorrent();

app.get('/stream', (req, res) => {
  const magnet = req.query.magnet;
  if (!magnet) return res.status(400).send('Missing magnet link');

  console.log('📡 Received magnet:', magnet);

  // Add torrent
  client.add(magnet, (torrent) => {
    const file = torrent.files.find(f => f.name.endsWith('.mp4') || f.name.endsWith('.mkv'));

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
  console.log(`✅ Torrent server running on http://localhost:${PORT}`);
});
