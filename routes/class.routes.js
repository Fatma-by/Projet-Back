const express = require('express');
const bodyParser = require('body-parser');
const classController = require('../controllers/class.controller');

const router = express.Router();

// Middleware pour parser le corps des requêtes
router.use(bodyParser.json());

// Route pour créer une nouvelle classe
router.post('/nouvelle-classe', classController.createClass);
router.get('/toutes-les-classes', classController.getAllClasses);


module.exports = router;
