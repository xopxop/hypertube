import dotenv from 'dotenv';
dotenv.config({ path: '../../.env.common' });

const PORT = process.env.USER_SERVER_PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
const DATABASE_URL = process.env.DATABASE_URL;

export { PORT, JWT_SECRET, JWT_EXPIRATION, DATABASE_URL };