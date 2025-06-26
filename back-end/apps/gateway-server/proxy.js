import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import {
  AUTH_SERVER_PORT,
  USER_SERVER_PORT,
  TORRENT_SERVER_PORT,
  authApiPath,
  userApiPath,
  torrentApiPath,
} from "./config.js";

const proxyRoutes = express.Router();

const authServerPath = `http://localhost:${AUTH_SERVER_PORT}`;
const torrentServerPath = `http://localhost:${TORRENT_SERVER_PORT}`;
const userServerPath = `http://localhost:${USER_SERVER_PORT}`;

proxyRoutes.use(
  authApiPath,
  createProxyMiddleware({
    target: authServerPath,
    changeOrigin: true,
    pathRewrite: {
      "^/api/auth": "",
    },
    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log(`[PROXY] ${req.method} ${req.originalUrl} -> ${authServerPath}${proxyReq.path}`);
      },
      error: (err, req, res) => {
        console.error(`[PROXY ERROR] Auth server unavailable:`, err.message);
        res.status(503).json({ error: "Auth service unavailable" });
      },
    },
  }),
);

proxyRoutes.use(
  torrentApiPath,
  createProxyMiddleware({
    target: torrentServerPath,
    changeOrigin: true,
    pathRewrite: {
      "^/api/torrent": "",
    },
    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log(`[PROXY] ${req.method} ${req.originalUrl} -> ${torrentServerPath}${proxyReq.path}`);
      },
      error: (err, req, res) => {
        console.error(`[PROXY ERROR] Torrent server unavailable:`, err.message);
        res.status(503).json({ error: "Torrent service unavailable" });
      },
    },
  }),
);

proxyRoutes.use(
  userApiPath,
  createProxyMiddleware({
    target: userServerPath,
    changeOrigin: true,
    pathRewrite: {
      "^/api/user": "",
    },
    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log(`[PROXY] ${req.method} ${req.originalUrl} -> ${userServerPath}${proxyReq.path}`);
      },
      error: (err, req, res) => {
        console.error(`[PROXY ERROR] User server unavailable:`, err.message);
        res.status(503).json({ error: "User service unavailable" });
      },
    },
  }),
);

export default proxyRoutes;
