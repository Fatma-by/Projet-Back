const Class = require("../models/class.schema");

const createClass = async (req, res) => {
  try {
    console.log(req.body)
    const nouvelleClasse = new Class(req.body);
    const data = await nouvelleClasse.save();
    console.log(data)
    res.status(201).json({
      NomClass: data.NomClass,
      Niveau: data.Niveau,
      Matiere: data.Matiere,
      _id: data._id,
    });
    console.log(nouvelleClasse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllClasses = async (req, res) => {
  try {

    const classes = await Class.find({user:req.query.user});
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createClass,
  getAllClasses,
};
