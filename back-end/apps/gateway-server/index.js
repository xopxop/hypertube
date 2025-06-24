import express from "express";
import { PORT } from './config.js';
import proxyRoutes from './proxy.js';
import { verifyToken } from './middleware.js';

const app = express();

app.use('/torrent', verifyToken);
app.use('/user', verifyToken);
app.use('/', proxyRoutes);

app.listen(PORT, () => {
  console.log(`✅ Gateway server running on http://localhost:${PORT}`);
});
