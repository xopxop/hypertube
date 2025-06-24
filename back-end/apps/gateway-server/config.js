import dotenv from 'dotenv';
dotenv.config({ path: '../../.env.common' });

const PORT = process.env.GATEWAY_SERVER_PORT;
const USER_SERVER_PORT = process.env.USER_SERVER_PORT;
const AUTH_SERVER_PORT = process.env.AUTH_SERVER_PORT;
const TORRENT_SERVER_PORT = process.env.TORRENT_SERVER_PORT;
const JWT_SECRET = process.env.JWT_SECRET;

export { PORT, USER_SERVER_PORT, AUTH_SERVER_PORT, TORRENT_SERVER_PORT, JWT_SECRET };
