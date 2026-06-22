const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

// All routes require authentication
router.use(auth);

// Profile routes
router.get('/search', userController.search);
router.get('/me', userController.getMe);
router.put('/me', userController.updateProfile);
router.get('/:id', userController.getById);

// Phone management
router.post('/me/phone', userController.addPhone);
router.delete('/me/phone/:phone', userController.removePhone);

// Follow system
router.post('/:id/follow', userController.follow);
router.delete('/:id/follow', userController.unfollow);
router.get('/:id/followers', userController.getFollowers);
router.get('/:id/following', userController.getFollowing);

// User's posts
router.get('/:id/posts', postController.getByUser);

module.exports = router;
