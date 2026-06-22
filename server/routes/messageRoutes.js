const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const messageController = require('../controllers/messageController');

// All routes require authentication
router.use(auth);

// Message routes
router.post('/', messageController.send);
router.get('/conversations', messageController.getConversations);
router.get('/:userId', messageController.getThread);
router.put('/:id/read', messageController.markAsRead);

module.exports = router;
