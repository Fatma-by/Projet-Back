const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Utilisez la fonction login du contrôleur pour gérer la route POST /login
router.post('/login', authController.login);

// Utilisez la fonction register du contrôleur pour gérer la route POST /register
router.post('/register', authController.register);

module.exports = router;
