const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/auth.schema"); // Assurez-vous d'importer votre modèle Mongoose approprié

// Fonction d'inscription pour récupérer les emails et mots de passe (cryptés) des utilisateurs
// Vérifiez si l'e-mail est déjà utilisé
async function register(req, res) {
  try {
    const saltRounds = 10;
    const hashed = bcrypt.hashSync(req.body.password, saltRounds);

    const newUser = new User({
      Nom: req.body.Nom,
      Prenom: req.body.Prenom,
      Role: req.body.Role,
      Adressepostale: req.body.Adressepostale,

      email: req.body.email,
      password: hashed,
    });

    const data = await newUser.save();

    res.status(201).json({
      Nom: data.Nom,
      Prenom: data.Prenom,
      email: data.email,
      _id: data._id,
    });
  } catch (error) {
    if (error.code === 11000)
      res.status(400).json({ message: "user already exists" });
    else res.status(500).json({ message: error.message });
  }
}

// Fonction de connexion pour vérifier si le mot de passe correspond à l'adresse saisie
async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).json({ message: "email not found" });
    } else {
      console.log(user);
      const match = bcrypt.compareSync(req.body.password, user.password);

      if (match) {
        const exp = Date.now() + 1000 * 15;
        const token = jwt.sign(
          { email: user.email, id: user._id, exp },
          "hjdbsbdqkjdbqksjdbqkjsdbqksdbqksdbjqsdbjqdsb"
        );

        res.cookie("access_token", token, {
          httpOnly: true,
          maxAge: exp,
        });

        res.status(200).json({
          message: "login with success",
          data: {
            email: user.email,
            _id: user._id,
            role: user.Role,
            name: user.Nom,
          },
        });
      } else {
        res.status(401).json({ message: "unauthorized" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  register,
  login,
};
