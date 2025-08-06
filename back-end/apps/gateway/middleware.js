import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET, movieApiPath, userApiPath } from "./config.js";

const middlewareRoutes = express.Router();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    console.log("[AUTH] No authorization header provided");
    return res.status(401).json({ error: "Authorization header required" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("[AUTH] No token provided in authorization header");
    return res.status(401).json({ error: "Token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log("[AUTH] Token verification failed:", err.message);
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    console.log(`[AUTH] Token verified for user: ${user.id || user.username}`);
    req.user = user;
    next();
  });
};

// middlewareRoutes.use(movieApiPath, verifyToken);
middlewareRoutes.use(userApiPath, verifyToken);

export default middlewareRoutes;
