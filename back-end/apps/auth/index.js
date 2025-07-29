import express from 'express';
import { PORT } from './config.js';
import routes from './routes.js';
import { connectToPostgreSqlAsync } from '../../db/db.js';

const app = express();

app.use(express.json());
app.use('/', routes);

await connectToPostgreSqlAsync();
app.listen(PORT, () => {
  console.log(`✅ Auth SERVICE is running on http://localhost:${PORT}`);
});
