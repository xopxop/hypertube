import express, { json } from 'express';
import { PORT } from './config.js';
import routes from './routes.js';
import { connectToPostgreSQL } from './db.js';

connectToPostgreSQL();

const app = express();
app.use(json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`User server is running on port ${PORT}`);
});
