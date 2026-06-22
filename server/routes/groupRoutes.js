const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const groupController = require('../controllers/groupController');

// All routes require authentication
router.use(auth);

// Group CRUD
router.post('/', groupController.create);
router.get('/', groupController.getAll);
router.get('/:id', groupController.getById);
router.put('/:id', groupController.update);
router.delete('/:id', groupController.delete);

// Membership
router.post('/:id/join', groupController.join);
router.delete('/:id/join', groupController.leave);
router.get('/:id/members', groupController.getMembers);

module.exports = router;
