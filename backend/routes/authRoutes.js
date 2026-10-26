const express = require('express');
const router = express.Router();
const { register, login, firebaseGoogleLogin } = require('../controllers/authController');

// Jab koi '/api/auth/register' par POST karega
router.post('/register', register);

// Jab koi '/api/auth/login' par POST karega
router.post('/login', login);

// 🔥 Firebase Google Login Route
router.post('/google-firebase', firebaseGoogleLogin);

module.exports = router;
