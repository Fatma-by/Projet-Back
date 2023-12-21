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
        Code: data.Code,
      _id: data._id,
    });
    console.log(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllStudents = async (req, res) => {
    try {
        console.log(req.query)
      const students = await Student.find({ class: req.query.class });
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