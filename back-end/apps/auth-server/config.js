import dotenv from 'dotenv';
dotenv.config({ path: '../../.env.common' });

export const PORT = process.env.AUTH_SERVER_PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
