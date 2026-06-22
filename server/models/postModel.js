const pool = require('../config/db');

const postModel = {
  // Create a new post
  async create(userId, content, mediaUrl = null, visibility = 'public') {
    const [result] = await pool.execute(
      'INSERT INTO Post (created_by, content, media_url, visibility) VALUES (?, ?, ?, ?)',
      [userId, content, mediaUrl, visibility]
    );
    return result;
  },

  // Get a single post with author info, like count, comment count, and whether current user liked it
  async findById(postId, currentUserId = null) {
    const [rows] = await pool.execute(
      `SELECT p.post_id, p.content, p.media_url, p.visibility, p.created_at, p.created_by,
              u.username,
              (SELECT COUNT(*) FROM User_Likes_Post WHERE post_id = p.post_id) AS likes_count,
              (SELECT COUNT(*) FROM Comment WHERE post_id = p.post_id) AS comments_count,
              ${currentUserId
                ? `(SELECT COUNT(*) FROM User_Likes_Post WHERE post_id = p.post_id AND user_id = ?) AS is_liked`
                : '0 AS is_liked'}
       FROM Post p
       JOIN User u ON p.created_by = u.user_id
       WHERE p.post_id = ?`,
      currentUserId ? [currentUserId, postId] : [postId]
    );
    return rows[0] || null;
  },

  // Get feed: posts from users that the current user follows + own posts, ordered by time
  async getFeed(userId, limit = 20, offset = 0) {
    const [rows] = await pool.query(
      `SELECT p.post_id, p.content, p.media_url, p.visibility, p.created_at, p.created_by,
              u.username,
              (SELECT COUNT(*) FROM User_Likes_Post WHERE post_id = p.post_id) AS likes_count,
              (SELECT COUNT(*) FROM Comment WHERE post_id = p.post_id) AS comments_count,
              (SELECT COUNT(*) FROM User_Likes_Post WHERE post_id = p.post_id AND user_id = ?) AS is_liked
       FROM Post p
       JOIN User u ON p.created_by = u.user_id
       WHERE p.created_by IN (
         SELECT following_id FROM User_Follows_User WHERE follower_id = ?
       ) OR p.created_by = ?
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      [userId, userId, userId, limit, offset]
    );
    return rows;
  },

  // Get all posts by a specific user
  async getByUserId(userId, currentUserId = null, limit = 20, offset = 0) {
    const [rows] = await pool.query(
      `SELECT p.post_id, p.content, p.media_url, p.visibility, p.created_at, p.created_by,
              u.username,
              (SELECT COUNT(*) FROM User_Likes_Post WHERE post_id = p.post_id) AS likes_count,
              (SELECT COUNT(*) FROM Comment WHERE post_id = p.post_id) AS comments_count,
              ${currentUserId
                ? `(SELECT COUNT(*) FROM User_Likes_Post WHERE post_id = p.post_id AND user_id = ?) AS is_liked`
                : '0 AS is_liked'}
       FROM Post p
       JOIN User u ON p.created_by = u.user_id
       WHERE p.created_by = ?
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      currentUserId ? [currentUserId, userId, limit, offset] : [userId, limit, offset]
    );
    return rows;
  },

  // Delete a post (only by owner)
  async delete(postId, userId) {
    const [result] = await pool.execute(
      'DELETE FROM Post WHERE post_id = ? AND created_by = ?',
      [postId, userId]
    );
    return result;
  },

  // Like a post
  async like(userId, postId) {
    const [result] = await pool.execute(
      'INSERT IGNORE INTO User_Likes_Post (user_id, post_id) VALUES (?, ?)',
      [userId, postId]
    );
    return result;
  },

  // Unlike a post
  async unlike(userId, postId) {
    const [result] = await pool.execute(
      'DELETE FROM User_Likes_Post WHERE user_id = ? AND post_id = ?',
      [userId, postId]
    );
    return result;
  },

  // Get users who liked a post
  async getLikes(postId) {
    const [rows] = await pool.execute(
      `SELECT u.user_id, u.username, ulp.liked_at
       FROM User_Likes_Post ulp
       JOIN User u ON ulp.user_id = u.user_id
       WHERE ulp.post_id = ?
       ORDER BY ulp.liked_at DESC`,
      [postId]
    );
    return rows;
  }
};

module.exports = postModel;
