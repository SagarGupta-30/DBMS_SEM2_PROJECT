const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const hashtagController = require('../controllers/hashtagController');

// All routes require authentication
router.use(auth);

// Hashtag routes
router.get('/trending', hashtagController.getTrending);
router.get('/:tag/posts', hashtagController.getPostsByTag);

module.exports = router;
