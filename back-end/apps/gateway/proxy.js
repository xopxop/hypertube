import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import {
  AUTH_SERVICE_PORT,
  USER_SERVICE_PORT,
  MOVIE_SERVICE_PORT,
  authApiPath,
  userApiPath,
  movieApiPath,
} from "./config.js";

const proxyRoutes = express.Router();

const authSERVICEPath = `http://localhost:${AUTH_SERVICE_PORT}`;
const movieSERVICEPath = `http://localhost:${MOVIE_SERVICE_PORT}`;
const userSERVICEPath = `http://localhost:${USER_SERVICE_PORT}`;

proxyRoutes.use(
  authApiPath,
  createProxyMiddleware({
    target: authSERVICEPath,
    changeOrigin: true,
    pathRewrite: {
      "^/api/auth": "",
    },
    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log(`[PROXY] ${req.method} ${req.originalUrl} -> ${authSERVICEPath}${proxyReq.path}`);
      },
      error: (err, req, res) => {
        console.error(`[PROXY ERROR] Auth SERVICE unavailable:`, err.message);
        res.status(503).json({ error: "Auth service unavailable" });
      },
    },
  }),
);

proxyRoutes.use(
  movieApiPath,
  createProxyMiddleware({
    target: movieSERVICEPath,
    changeOrigin: true,
    pathRewrite: {
      "^/api/movie": "",
    },
    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log(`[PROXY] ${req.method} ${req.originalUrl} -> ${movieSERVICEPath}${proxyReq.path}`);
      },
      error: (err, req, res) => {
        console.error(`[PROXY ERROR] Movie SERVICE unavailable:`, err.message);
        res.status(503).json({ error: "Movie service unavailable" });
      },
    },
  }),
);

proxyRoutes.use(
  userApiPath,
  createProxyMiddleware({
    target: userSERVICEPath,
    changeOrigin: true,
    pathRewrite: {
      "^/api/user": "",
    },
    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log(`[PROXY] ${req.method} ${req.originalUrl} -> ${userSERVICEPath}${proxyReq.path}`);
      },
      error: (err, req, res) => {
        console.error(`[PROXY ERROR] User SERVICE unavailable:`, err.message);
        res.status(503).json({ error: "User service unavailable" });
      },
    },
  }),
);

export default proxyRoutes;
