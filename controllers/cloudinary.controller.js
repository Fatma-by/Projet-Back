const { response } = require("express");

const cloudinary = require("cloudinary").v2;
const Resource = require("../models/resource.schema");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});


const createRessource = async (req, res) => {
  try {
    console.log(req.headers);
    const { file } = req.body;
   
    new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file, async (error, result) => {
        if (result && result.secure_url) {
;
         
            const newRessource = await Resource.create({
              NomEnseignant : req.headers.name,
              Niveau : req.headers.selectedniveau,
              Matiere : req.headers.selectedmatiere,
              Nature :req.headers.selectednature,
              Document : {
                url : result.secure_url,
                public_id : result.public_id
              },
              Trimestre : req.headers.selectedtrimestre
  
            })
          res.status(201).json({});

          return resolve(result.secure_url);
        }
        console.log(error.message);
        return reject({ message: error.message });
      });
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "error" });
  }
};

const getRessources = async (req, res) => {
  try {
    const data = req.body
    console.log(data)
    let query = {}
    switch (data.code) {
      case "'s/2/d/1'":
        query = {
          Nature: "Devoir",
          Matiere: "Science",
          Niveau: "Deuxième Année",
          Trimestre: "Première Trimèstre",
        }
        
        break;
    
      default:
        break;
    }
    const Ressources= await Resource.find(query)
    res.status(200).json({Ressources: Ressources});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erreur lors de la récupération des devoirs' });
  }
};

module.exports = {
  createRessource,
  getRessources
}