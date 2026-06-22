const pool = require('../config/db');

const followModel = {
  // Follow a user
  async follow(followerId, followingId) {
    const [result] = await pool.execute(
      'INSERT IGNORE INTO User_Follows_User (follower_id, following_id) VALUES (?, ?)',
      [followerId, followingId]
    );
    return result;
  },

  // Unfollow a user
  async unfollow(followerId, followingId) {
    const [result] = await pool.execute(
      'DELETE FROM User_Follows_User WHERE follower_id = ? AND following_id = ?',
      [followerId, followingId]
    );
    return result;
  },

  // Check if user A follows user B
  async isFollowing(followerId, followingId) {
    const [rows] = await pool.execute(
      'SELECT COUNT(*) AS count FROM User_Follows_User WHERE follower_id = ? AND following_id = ?',
      [followerId, followingId]
    );
    return rows[0].count > 0;
  },

  // Get followers of a user
  async getFollowers(userId) {
    const [rows] = await pool.execute(
      `SELECT u.user_id, u.username, ufu.followed_at
       FROM User_Follows_User ufu
       JOIN User u ON ufu.follower_id = u.user_id
       WHERE ufu.following_id = ?
       ORDER BY ufu.followed_at DESC`,
      [userId]
    );
    return rows;
  },

  // Get users that a user is following
  async getFollowing(userId) {
    const [rows] = await pool.execute(
      `SELECT u.user_id, u.username, ufu.followed_at
       FROM User_Follows_User ufu
       JOIN User u ON ufu.following_id = u.user_id
       WHERE ufu.follower_id = ?
       ORDER BY ufu.followed_at DESC`,
      [userId]
    );
    return rows;
  }
};

module.exports = followModel;
