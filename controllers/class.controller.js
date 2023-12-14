const Class = require('../models/class.schema');

const createClass = async (req, res) => {
    try {
        const { NomClass, Niveau, Matiere } = req.body;
        const nouvelleClasse = new Class({ NomClass, Niveau, Matiere });
        const data= await nouvelleClasse.save();
        res.status(201).json({
            NomClass: data.NomClass,
            Niveau: data.Niveau,
            Matiere: data.Matiere,
            _id: data._id,
          });        console.log(nouvelleClasse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createClass,
};
