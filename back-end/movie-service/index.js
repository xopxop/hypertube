const express = require('express');
const app = express();
const port = 3000;

app.get('/search', (req, res) => {
  const movieName = req.query.q;
  return res.json({
    message: `Searching for movie: ${movieName}`,
    results: [
      { title: 'Inception', year: 2010 },
      { title: 'Interstellar', year: 2014 },
      { title: 'The Dark Knight', year: 2008 }
    ]
  });
});

app.listen(port, () => {
  console.log(`Movie service listening at http://localhost:${port}`);
});