const pool = require('../config/db');

const adminModel = {
  // Get aggregated system statistics
  async getSystemStats() {
    // Run multiple aggregate queries in parallel
    const [usersResult, postsResult, commentsResult, messagesResult, groupsResult] = await Promise.all([
      pool.execute('SELECT COUNT(*) AS count FROM User'),
      pool.execute('SELECT COUNT(*) AS count FROM Post'),
      pool.execute('SELECT COUNT(*) AS count FROM Comment'),
      pool.execute('SELECT COUNT(*) AS count FROM Message'),
      pool.execute('SELECT COUNT(*) AS count FROM UserGroup')
    ]);

    return {
      totalUsers: usersResult[0][0].count,
      totalPosts: postsResult[0][0].count,
      totalComments: commentsResult[0][0].count,
      totalMessages: messagesResult[0][0].count,
      totalGroups: groupsResult[0][0].count
    };
  }
};

module.exports = adminModel;
