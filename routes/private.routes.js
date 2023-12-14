const express = require('express');
const router = express.Router();
const privateController = require('../controllers/private.controller');

// Utilisez la fonction autho du contrôleur pour gérer la route GET /private
router.get("/private", privateController.autho);

module.exports = router;
  