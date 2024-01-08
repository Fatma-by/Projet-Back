const multer = require("multer");

const storage = multer.memoryStorage(); // Utilisez la mémoire pour stocker temporairement le fichier

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limite la taille du fichier à 5 Mo (ajustez selon vos besoins)
  },
}).single("file"); // "file" correspond au champ du formulaire où le fichier est envoyé

module.exports = upload;
