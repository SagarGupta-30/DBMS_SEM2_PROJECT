const pool = require('../config/db');

const hashtagModel = {
  // Find or create a hashtag (INSERT IGNORE + SELECT)
  async findOrCreate(tagName) {
    const normalized = tagName.toLowerCase().trim();
    await pool.execute(
      'INSERT IGNORE INTO HashTag (tag_name) VALUES (?)',
      [normalized]
    );
    const [rows] = await pool.execute(
      'SELECT * FROM HashTag WHERE tag_name = ?',
      [normalized]
    );
    return rows[0];
  },

  // Link a post to a hashtag
  async linkToPost(postId, hashtagId) {
    const [result] = await pool.execute(
      'INSERT IGNORE INTO Post_Contains_HashTag (post_id, hashtag_id) VALUES (?, ?)',
      [postId, hashtagId]
    );
    return result;
  },

  // Get trending hashtags (most used in last 7 days)
  async getTrending(limit = 10) {
    const [rows] = await pool.query(
      `SELECT h.hashtag_id, h.tag_name, COUNT(pch.post_id) AS post_count
       FROM HashTag h
       JOIN Post_Contains_HashTag pch ON h.hashtag_id = pch.hashtag_id
       JOIN Post p ON pch.post_id = p.post_id
       WHERE p.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
       GROUP BY h.hashtag_id, h.tag_name
       ORDER BY post_count DESC
       LIMIT ?`,
      [limit]
    );
    return rows;
  },

  // Get all posts with a specific hashtag
  async getPostsByTag(tagName, currentUserId = null, limit = 20, offset = 0) {
    const normalized = tagName.toLowerCase().trim();
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
       JOIN Post_Contains_HashTag pch ON p.post_id = pch.post_id
       JOIN HashTag h ON pch.hashtag_id = h.hashtag_id
       WHERE h.tag_name = ?
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      currentUserId ? [currentUserId, normalized, limit, offset] : [normalized, limit, offset]
    );
    return rows;
  },

  // Get hashtags for a specific post
  async getByPostId(postId) {
    const [rows] = await pool.execute(
      `SELECT h.hashtag_id, h.tag_name
       FROM HashTag h
       JOIN Post_Contains_HashTag pch ON h.hashtag_id = pch.hashtag_id
       WHERE pch.post_id = ?`,
      [postId]
    );
    return rows;
  },

  // Extract hashtags from text
  extractFromText(text) {
    const regex = /#(\w+)/g;
    const tags = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      tags.push(match[1].toLowerCase());
    }
    return [...new Set(tags)]; // deduplicate
  }
};

module.exports = hashtagModel;
