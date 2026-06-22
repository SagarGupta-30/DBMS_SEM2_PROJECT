const pool = require('../config/db');

const messageModel = {
  // Send a message
  async create(senderId, receiverId, content) {
    const [result] = await pool.execute(
      'INSERT INTO Message (sender, receiver, message_text) VALUES (?, ?, ?)',
      [senderId, receiverId, content]
    );
    return result;
  },

  // Get conversation list: most recent message with each user
  async getConversations(userId) {
    const [rows] = await pool.execute(
      `SELECT 
        u.user_id, u.username,
        m.message_text AS last_message,
        m.sent_time AS last_message_time,
        m.sender AS last_sender
      FROM (
        SELECT 
          CASE WHEN sender = ? THEN receiver ELSE sender END AS other_user_id,
          MAX(message_id) AS max_id
        FROM Message
        WHERE sender = ? OR receiver = ?
        GROUP BY other_user_id
      ) AS convos
      JOIN Message m ON m.message_id = convos.max_id
      JOIN User u ON u.user_id = convos.other_user_id
      ORDER BY m.sent_time DESC`,
      [userId, userId, userId, userId]
    );
    return rows;
  },

  // Get message thread between two users
  async getThread(userId, otherUserId, limit = 50, offset = 0) {
    const [rows] = await pool.query(
      `SELECT m.message_id, m.sender, m.receiver, m.message_text AS content, m.sent_time,
              s.username AS sender_username,
              r.username AS receiver_username
       FROM Message m
       JOIN User s ON m.sender = s.user_id
       JOIN User r ON m.receiver = r.user_id
       WHERE (m.sender = ? AND m.receiver = ?)
          OR (m.sender = ? AND m.receiver = ?)
       ORDER BY m.sent_time ASC
       LIMIT ? OFFSET ?`,
      [userId, otherUserId, otherUserId, userId, limit, offset]
    );
    return rows;
  },

  // Mark messages as read (stubbed — is_read column not in ER diagram)
  async markAsRead(messageId, receiverId) {
    return { affectedRows: 0 };
  },

  // Mark all messages from a sender as read (stubbed — is_read column not in ER diagram)
  async markAllAsRead(senderId, receiverId) {
    return { affectedRows: 0 };
  }
};

module.exports = messageModel;
