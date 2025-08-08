import { pool } from '../db.js';
import '../models/auth-user.model.js';

export const AuthUserRepository = {
  /**
   * @param {string} email 
   * @returns {Promise<AuthUser>}
   */
  async findUserByEmailAsync(email) {
    const sql = `
      SELECT
        user_id AS "userId",
        user_name AS "username",
        email,
        hashed_password AS "hashedPassword"
      FROM auth_users
      WHERE email = $1
    `;
    const result = await pool.query(sql, [email]);
    return result.rows[0];
  },

  /**
   * @param {string} username
   * @returns {Promise<boolean>}
   */
  async userExistsAsync(username) {
    const sql = 'SELECT 1 FROM auth_users WHERE user_name = $1';
    const result = await pool.query(sql, [username]);
    return result.rows.length > 0;
  },

  /**
   * @param {string} email
   * @returns {Promise<boolean>}
   */
  async emailExistsAsync(email) {
    const sql = 'SELECT 1 FROM auth_users WHERE email = $1';
    const result = await pool.query(sql, [email]);
    return result.rows.length > 0;
  },

  /**
   * @param {AuthUser} user
   * @returns {Promise<string>}
   */
  async createUserAsync(user) {
    const { username, email, hashedPassword } = user;
    const sql = `
      INSERT INTO auth_users (user_name, email, hashed_password)
      VALUES ($1, $2, $3)
      RETURNING
        user_id AS "userId"
    `;
    const result = await pool.query(sql, [username, email, hashedPassword]);
    return result.rows[0].userId;
  }
};
