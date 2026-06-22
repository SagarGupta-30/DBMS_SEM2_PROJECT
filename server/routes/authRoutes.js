const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', authController.registerValidation, authController.register);

// POST /api/auth/login
router.post('/login', authController.loginValidation, authController.login);

module.exports = router;
