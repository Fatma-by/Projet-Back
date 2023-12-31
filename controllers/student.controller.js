const Student = require("../models/student.schema");

const createStudent = async (req, res) => {
  try {
    console.log(req.body);
    const newStudent = new Student(req.body);
    const data = await newStudent.save();
    console.log(newStudent);

    res.status(201).json({
      NomStudent: data.NomStudent,
      PrenomStudent: data.PrenomStudent,
      AdressMail: data.AdressMail,
      _id: data._id,
    });
  } catch (error) {
    if (error.code === 11000) {
      // Le code 11000 correspond à une contrainte unique violée dans MongoDB
      return res.status(400).json({
        message: "Elève déjà existant avec cette adresse mail.",
      });
    }
    console.error("MongoDB error:", error);
    res.status(500).json({ error: error.message });
  }
};
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ user: req.query.user });

    console.log("students", students);
    res.json(students);
  } catch (error) {
    console.error("MongoDB error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
};
