import dotenv from "dotenv";
dotenv.config({ path: "../../.env.common" });

const PORT = process.env.GATEWAY_SERVICE_PORT;
const USER_SERVICE_PORT = process.env.USER_SERVICE_PORT;
const AUTH_SERVICE_PORT = process.env.AUTH_SERVICE_PORT;
const TORRENT_SERVICE_PORT = process.env.TORRENT_SERVICE_PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const torrentApiPath = "/api/torrent";
const userApiPath = "/api/user";
const authApiPath = "/api/auth";

export {
  PORT,
  USER_SERVICE_PORT,
  AUTH_SERVICE_PORT,
  TORRENT_SERVICE_PORT,
  JWT_SECRET,
  torrentApiPath,
  userApiPath,
  authApiPath,
};
