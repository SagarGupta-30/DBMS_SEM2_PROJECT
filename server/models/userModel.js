const pool = require('../config/db');

const userModel = {
  // Create a new user
  async create(username, email, passwordHash, dateOfBirth = null) {
    const [result] = await pool.execute(
      'INSERT INTO User (username, email, password, dateOfBirth) VALUES (?, ?, ?, ?)',
      [username, email, passwordHash, dateOfBirth]
    );
    return result;
  },

  // Find user by email (includes password for auth comparison)
  async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT user_id, username, email, password FROM User WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  },

  // Find user by username (includes password for auth comparison)
  async findByUsername(username) {
    const [rows] = await pool.execute(
      'SELECT user_id, username, email, password FROM User WHERE username = ?',
      [username]
    );
    return rows[0] || null;
  },

  // Find user by ID (excludes password)
  async findById(userId) {
    const [rows] = await pool.execute(
      `SELECT user_id, username, email, bio, join_date, dateOfBirth
       FROM User WHERE user_id = ?`,
      [userId]
    );
    return rows[0] || null;
  },

  // Get user profile with follower/following counts
  async getProfile(userId) {
    const [rows] = await pool.execute(
      `SELECT u.user_id, u.username, u.email, u.bio, u.join_date, u.dateOfBirth,
              (SELECT COUNT(*) FROM User_Follows_User WHERE following_id = u.user_id) AS followers_count,
              (SELECT COUNT(*) FROM User_Follows_User WHERE follower_id = u.user_id) AS following_count,
              (SELECT COUNT(*) FROM Post WHERE created_by = u.user_id) AS posts_count
       FROM User u WHERE u.user_id = ?`,
      [userId]
    );
    return rows[0] || null;
  },

  // Update user profile
  async updateProfile(userId, { bio, dateOfBirth }) {
    const fields = [];
    const values = [];

    if (bio !== undefined) { fields.push('bio = ?'); values.push(bio); }
    if (dateOfBirth !== undefined) { fields.push('dateOfBirth = ?'); values.push(dateOfBirth); }

    if (fields.length === 0) return null;

    values.push(userId);
    const [result] = await pool.execute(
      `UPDATE User SET ${fields.join(', ')} WHERE user_id = ?`,
      values
    );
    return result;
  },

  // Search users by username
  async search(query) {
    const searchTerm = `%${query}%`;
    const [rows] = await pool.execute(
      `SELECT user_id, username
       FROM User WHERE username LIKE ? LIMIT 20`,
      [searchTerm]
    );
    return rows;
  },

  // Add phone number
  async addPhone(userId, phoneNumber) {
    const [result] = await pool.execute(
      'INSERT INTO User_Phone (user_id, phone_number) VALUES (?, ?)',
      [userId, phoneNumber]
    );
    return result;
  },

  // Remove phone number
  async removePhone(userId, phoneNumber) {
    const [result] = await pool.execute(
      'DELETE FROM User_Phone WHERE user_id = ? AND phone_number = ?',
      [userId, phoneNumber]
    );
    return result;
  },

  // Get phone numbers for a user
  async getPhones(userId) {
    const [rows] = await pool.execute(
      'SELECT phone_number FROM User_Phone WHERE user_id = ?',
      [userId]
    );
    return rows;
  }
};

module.exports = userModel;
