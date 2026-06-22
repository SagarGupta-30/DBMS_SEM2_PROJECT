const adminModel = require('../models/adminModel');

const adminController = {
  // GET /api/admin/stats
  async getStats(req, res, next) {
    try {
      const stats = await adminModel.getSystemStats();
      res.json(stats);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = adminController;
