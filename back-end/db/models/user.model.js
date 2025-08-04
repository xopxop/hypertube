import { pool } from '../db.js';

/**
 * @typedef {Object} User
 * @property {number} id - User ID
 * @property {string} username - Username
 * @property {string} password - Hashed password
 */

export const User = {
  /**
   * @returns {Promise<User[]>}
   */
  async findUserByUsernameAsync(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  },

  /**
   * @param {string} username
   * @returns {Promise<boolean>}
   */
  async userExistsAsync(username) {
    const result = await pool.query('SELECT 1 FROM users WHERE username = $1', [username]);
    return result.rows.length > 0;
  },

  /**
   * @param {string} username
   * @param {string} hashedPassword
   * @returns {Promise<void>}
   */
  async createUserAsync(username, hashedPassword) {
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
  },
};
