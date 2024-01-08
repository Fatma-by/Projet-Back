const { response } = require("express");

const cloudinary = require("cloudinary").v2;
const Resource = require("../models/resource.schema");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
//  async (req, res) => {
//   try {
//     console.log(req.body);

//     res.status(201).json();
//     console.log(nouvelleRessource);
//   } catch (error) {
//     console.error(error);
//     if (error.code === 11000) {
//       // Le code 11000 correspond à une contrainte unique violée dans MongoDB
//       res
//         .status(400)
//         .json({ message: "Classe déjà existante avec ce nom." });
//     } else {
//       res.status(500).json({ error: error.message });
//     }
//   }
// };

module.exports = createRessource = async (req, res) => {
  try {
    console.log(req.headers.name);
    const { file } = req.body;
    let response = {
      public_id: "",
      url: "",
    };
    new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file, async (error, result) => {
        if (result && result.secure_url) {
          console.log(result.public_id);
          response.public_id=result.public_id
          response.url = result.secure_url
          // const nouvelleRessource =
          // {
          //   NomEnseignant: req.body.NomEnseignant,
          //   Niveau: req.body.Niveau,
          //   Matiere: req.body.Matiere,
          //   Document:{
          //     url : result.secure_url,
          //     public_id : result.public_id
          //   },
          //   Trimestre:req.body.Trimestre,

          // }
          // const save  = await Resource.create(nouvelleRessource)
          // console.log(save)
          res.status(201).json({
            url: result.secure_url,
            public_id:result.public_id
          });

          return resolve(result.secure_url);
        }
        console.log(error.message);
        return reject({ message: error.message });
      });
    });

    // Vous n'avez pas besoin d'une connexion directe à la base de données ici
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "error" });
  }
};
