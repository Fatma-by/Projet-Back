const Student = require("../models/student.schema");

const createStudent = async (req, res) => {
  try {
    console.log(req.body)
    const newStudent = new Student(req.body);
    const data = await newStudent.save();
    console.log(data)
    res.status(201).json({
        NomStudent: data.NomStudent,
        PrenomStudent: data.PrenomStudent,
        AdressMail: data.AdressMail,
      _id: data._id,
    });
    console.log(newStudent);
  } catch (error) {
    if ( error.code === 11000) {
      // Le code 11000 correspond à une contrainte unique violée dans MongoDB
      res.status(400).json({ message: 'Elève déjà existant avec cette adresse mail.' });
    }
    res.status(500).json({ error: error.message });
  }
};
const getAllStudents = async (req, res) => {
    try {
        console.log(req.query)
      const students = await Student.find({ Class: req.query.Class });
      console.log(students)
      res.json(students);
    } catch (error) {
      
      res.status(500).json({ error: error.message });
    }
  };
  
module.exports = {
    createStudent,
    getAllStudents
  };