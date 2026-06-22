const pool = require('../config/db');

const commentModel = {
  // Add a comment to a post
  async create(postId, userId, content) {
    const [result] = await pool.execute(
      'INSERT INTO Comment (post_id, commented_by, comment_text) VALUES (?, ?, ?)',
      [postId, userId, content]
    );
    return result;
  },

  // Get all comments for a post with author info
  async getByPostId(postId) {
    const [rows] = await pool.execute(
      `SELECT c.comment_id, c.post_id, c.commented_by, c.comment_text AS content, c.created_at,
               u.username
        FROM Comment c
        JOIN User u ON c.commented_by = u.user_id
        WHERE c.post_id = ?
        ORDER BY c.created_at ASC`,
      [postId]
    );
    return rows;
  },

  // Find comment by ID
  async findById(commentId) {
    const [rows] = await pool.execute(
      'SELECT comment_id, post_id, commented_by, comment_text AS content, created_at FROM Comment WHERE comment_id = ?',
      [commentId]
    );
    return rows[0] || null;
  },

  // Delete a comment (only by owner)
  async delete(commentId, userId) {
    const [result] = await pool.execute(
      'DELETE FROM Comment WHERE comment_id = ? AND commented_by = ?',
      [commentId, userId]
    );
    return result;
  }
};

module.exports = commentModel;
