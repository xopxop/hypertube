import express from 'express';
import webTorrent from 'webtorrent';

const app = express();
const client = new webTorrent();
const port = 3000;

app.get('/stream', (req, res) => {
  const { magnet } = req.query;

  if (!magnet) return res.status(400).json({ error: 'Magnet link is required' });
  console.log(`Received magnet link: ${magnet}`);
  client.add(magnet, { destroyStoreOnDestroy: true }, (torrent) => {
    const file = torrent.files.find(file => file.name.endsWith('.mp4') || file.name.endsWith('.mkv'));
    console.log(file);
    if (!file) return res.status(404).send('No MP4 file found in torrent.');

    console.log(`Streaming file: ${file.name}`);

    res.writeHead(200, {
      'Content-Type': 'video/mp4',
      'Accept-Range': 'bytes',
    });

    const stream = file.createReadStream();

    stream.on('error', (err) => {
      console.error('Stream error:', err);
      res.status(500).end();
    });

    res.on('close', () => {
      console.log('Stream closed by client, destroying torrent.');
      torrent.destroy();
    });
  });
});

app.listen(port, () => {
  console.log(`Torrent service listening at http://localhost:${port}`);
});