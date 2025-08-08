import express from 'express';
import { PORT } from './config.js';
import routes from './routes.js';
import { connectToPostgreSqlAsync } from '../../db/db.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', routes);

await connectToPostgreSqlAsync();
app.listen(PORT, () => {
  console.log(`✅ Auth SERVICE is running on http://localhost:${PORT}`);
});
