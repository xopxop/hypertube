const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Torrent service listening at http://localhost:${port}`);
});