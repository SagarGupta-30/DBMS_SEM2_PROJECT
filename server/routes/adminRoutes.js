const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

// Apply authentication middleware to all admin routes
router.use(authMiddleware);

// Get platform statistics
router.get('/stats', adminController.getStats);

module.exports = router;
