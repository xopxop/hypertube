import express from 'express';
import { createProxyMiddleware } from "http-proxy-middleware";
import { AUTH_SERVER_PORT, USER_SERVER_PORT, TORRENT_SERVER_PORT } from './config.js';

const proxyRoutes = express.Router();

const authPath = '/api/auth';
const torrentPath = '/api/torrent';
const userPath = '/api/user';

const services = {
  '/api/auth': 'http://auth-server:4000',
  '/api/users': 'http://user-server:4001',
  '/api/torrent': 'http://torrent-server:4002',
};

proxyRoutes.use(torrentPath, createProxyMiddleware({
  target: `http://localhost:${TORRENT_SERVER_PORT}`,
  changeOrigin: true,
}));

proxyRoutes.use(userPath, createProxyMiddleware({
  target: `http://localhost:${USER_SERVER_PORT}`,
  changeOrigin: true,
}));

proxyRoutes.use(authPath, createProxyMiddleware({
  target: `http://localhost:${AUTH_SERVER_PORT}`,
  changeOrigin: true,
}));

export default proxyRoutes;
