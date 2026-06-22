const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

// All routes require authentication
router.use(auth);

// Post CRUD
router.post('/', postController.create);
router.get('/feed', postController.getFeed);
router.get('/:id', postController.getById);
router.delete('/:id', postController.delete);

// Likes
router.post('/:id/like', postController.like);
router.delete('/:id/like', postController.unlike);
router.get('/:id/likes', postController.getLikes);

// Comments (nested under posts)
router.post('/:id/comments', commentController.create);
router.get('/:id/comments', commentController.getByPost);

module.exports = router;
