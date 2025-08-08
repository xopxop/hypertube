import { pool } from "../db.js";
import "../models/user-profile.model.js";

export const UserProfileRepository = {
  async createProfileAsync(profile) {
    const { userId, firstName, lastName } = profile;
    await pool.query(
      'INSERT INTO user_profiles (user_id, first_name, last_name) VALUES ($1, $2, $3)',
      [userId, firstName, lastName]
    );
  },
};