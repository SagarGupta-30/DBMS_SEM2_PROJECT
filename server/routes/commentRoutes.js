const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentController = require('../controllers/commentController');

// All routes require authentication
router.use(auth);

// DELETE /api/comments/:id
router.delete('/:id', commentController.delete);

module.exports = router;
