import express, { json } from 'express';
import { PORT } from './config.js';
import routes from './routes.js';
import { connectToPostgreSqlAsync } from '../../db/db.js';

await connectToPostgreSqlAsync();

const app = express();
app.use(json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`✅ User server running on http://localhost:${PORT}`);
});
