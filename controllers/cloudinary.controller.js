const { response } = require("express");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

module.exports = clodi = async (req, res) => {
  console.log(req.body)
  try {
    // await new Promise((resolve, reject) => {
    //   cloudinary.uploader
    //     .upload_stream({}, function (error, result) {
    //       if (error) {
    //         console.log(error);
    //         reject(error);
    //         return;
    //       }
    //       console.log(result);
    //       resolve(result);
    //     })
    //     .end();
    // });


   
      //imgage = > base64
       new Promise((resolve, reject) => {
        cloudinary.uploader.upload(req.body.file, (error, result) => {
          if (result && result.secure_url) {
            console.log(result.secure_url);
            return resolve(result.secure_url);
          }
          console.log(error.message);
          return reject({ message: error.message });
        });
      });
 
    res.status(201).json({ message: "succed" });
    // Vous n'avez pas besoin d'une connexion directe à la base de données ici
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
};
