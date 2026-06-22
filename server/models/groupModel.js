const pool = require('../config/db');

const groupModel = {
  // Create a group
  async create(groupName, description, createdBy) {
    const [result] = await pool.execute(
      'INSERT INTO UserGroup (group_name, description, created_by) VALUES (?, ?, ?)',
      [groupName, description, createdBy]
    );
    return result;
  },

  // Get group by ID with member count and creator info
  async findById(groupId) {
    const [rows] = await pool.execute(
      `SELECT g.group_id, g.group_name, g.description, g.created_by, g.created_on,
              u.username AS creator_username,
              (SELECT COUNT(*) FROM User_Joins_UserGroup WHERE group_id = g.group_id) AS member_count
       FROM UserGroup g
       LEFT JOIN User u ON g.created_by = u.user_id
       WHERE g.group_id = ?`,
      [groupId]
    );
    return rows[0] || null;
  },

  // List all groups
  async getAll() {
    const [rows] = await pool.execute(
      `SELECT g.group_id, g.group_name, g.description, g.created_by, g.created_on,
              u.username AS creator_username,
              (SELECT COUNT(*) FROM User_Joins_UserGroup WHERE group_id = g.group_id) AS member_count
       FROM UserGroup g
       LEFT JOIN User u ON g.created_by = u.user_id
       ORDER BY g.created_on DESC`
    );
    return rows;
  },

  // Update group (creator only)
  async update(groupId, createdBy, { groupName, description }) {
    const fields = [];
    const values = [];

    if (groupName !== undefined) { fields.push('group_name = ?'); values.push(groupName); }
    if (description !== undefined) { fields.push('description = ?'); values.push(description); }

    if (fields.length === 0) return null;

    values.push(groupId, createdBy);
    const [result] = await pool.execute(
      `UPDATE UserGroup SET ${fields.join(', ')} WHERE group_id = ? AND created_by = ?`,
      values
    );
    return result;
  },

  // Delete group (creator only)
  async delete(groupId, createdBy) {
    const [result] = await pool.execute(
      'DELETE FROM UserGroup WHERE group_id = ? AND created_by = ?',
      [groupId, createdBy]
    );
    return result;
  },

  // Join a group
  async join(userId, groupId) {
    const [result] = await pool.execute(
      'INSERT IGNORE INTO User_Joins_UserGroup (user_id, group_id) VALUES (?, ?)',
      [userId, groupId]
    );
    return result;
  },

  // Leave a group
  async leave(userId, groupId) {
    const [result] = await pool.execute(
      'DELETE FROM User_Joins_UserGroup WHERE user_id = ? AND group_id = ?',
      [userId, groupId]
    );
    return result;
  },

  // Get members of a group
  async getMembers(groupId) {
    const [rows] = await pool.execute(
      `SELECT u.user_id, u.username, ujg.joined_at
       FROM User_Joins_UserGroup ujg
       JOIN User u ON ujg.user_id = u.user_id
       WHERE ujg.group_id = ?
       ORDER BY ujg.joined_at ASC`,
      [groupId]
    );
    return rows;
  },

  // Check if user is a member
  async isMember(userId, groupId) {
    const [rows] = await pool.execute(
      'SELECT COUNT(*) AS count FROM User_Joins_UserGroup WHERE user_id = ? AND group_id = ?',
      [userId, groupId]
    );
    return rows[0].count > 0;
  },

  // Get groups a user has joined
  async getUserGroups(userId) {
    const [rows] = await pool.execute(
      `SELECT g.group_id, g.group_name, g.description, g.created_by, g.created_on, 
              (SELECT COUNT(*) FROM User_Joins_UserGroup WHERE group_id = g.group_id) AS member_count
       FROM User_Joins_UserGroup ujg
       JOIN UserGroup g ON ujg.group_id = g.group_id
       WHERE ujg.user_id = ?
       ORDER BY ujg.joined_at DESC`,
      [userId]
    );
    return rows;
  }
};

module.exports = groupModel;
