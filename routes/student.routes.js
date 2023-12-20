const express = require('express');
const bodyParser = require('body-parser');
const studentController = require('../controllers/student.controller');

const router = express.Router();

// Middleware pour parser le corps des requêtes
router.use(bodyParser.json());

// Route pour créer une nouvelle classe
router.post('/nouvelle-student', studentController.createStudent);
router.get('/Allstudent', studentController.getAllStudents);

module.exports = router;
