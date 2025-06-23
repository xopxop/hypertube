import { db } from './db.js';

const findUserByUsernameAsync = async(username) => {
  const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
}

const userExistsAsync = async (username) => {
  const result = await db.query('SELECT 1 FROM users WHERE username = $1', [username]);
  return result.rows.length > 0;
}

const createUserAsync = async(username, hashedPassword) => {
  await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
}

export { findUserByUsernameAsync, userExistsAsync, createUserAsync };