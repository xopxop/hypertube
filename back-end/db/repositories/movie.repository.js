import { pool } from "../db.js";
import '../models/movie.model.js';

export const MovieRepository = {
  /**
   * @returns {Promise<Movie[]>}
   */
  async findAll() {
    return (await pool.query("SELECT * FROM movies")).rows;
  },

  /**
   * @param {number} id
   * @returns {Promise<Movie>}
   */
  async findById(id) {
    return (await pool.query("SELECT * FROM movies WHERE id = $1", [id])).rows[0];
  },

  /**
   * @param {Movie} data
   * @returns {Promise<Movie>}
   */
  async create(data) {
    const { title, year, genre, rating, posterUrl, magnetLink, description, duration } = data;    
    const result = await pool.query(
      "INSERT INTO movies (title, year, genre, rating, poster_url, magnet_link, description, duration) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [title, year, genre, rating, posterUrl, magnetLink, description, duration]
    );
    return result.rows[0];
  },

  /**
   * @param {number} id
   * @param {Movie} data
   * @returns {Promise<Movie>}
   */
  async update(id, data) {
    const { title, year, genre, rating, posterUrl, description, duration } = data;
    const result = await pool.query(
      "UPDATE movies SET title = $1, year = $2, genre = $3, rating = $4, poster_url = $5, description = $6, duration = $7 WHERE id = $8 RETURNING *",
      [title, year, genre, rating, posterUrl, description, duration, id]
    );
    return result.rows[0];
  },

  /**
   * @param {number} id
   * @returns {Promise<{id: number}>}
   */
  async delete(id) {
    await pool.query("DELETE FROM movies WHERE id = $1", [id]);
    return { id };
  },
};
