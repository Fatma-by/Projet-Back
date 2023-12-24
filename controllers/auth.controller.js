const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/auth.schema"); // Assurez-vous d'importer votre modèle Mongoose approprié

// Fonction d'inscription pour récupérer les emails et mots de passe (cryptés) des utilisateurs
// Vérifiez si l'e-mail est déjà utilisé
async function register(req, res) {
  try {
    const saltRounds = 10;
    const hashed = bcrypt.hashSync(req.body.password, saltRounds);
    console.log(req.body.Role.length);

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

    const temp = user.Role.split("");
    temp.shift();
    temp.pop();
    const r = temp.join("");

    if (!user) {
      res.status(404).json({ message: "Email not found" });
    } else {
      const match = bcrypt.compareSync(req.body.password, user.password);

      if (match) {
        const oneDayInSeconds = 24 * 60 * 60;
        const expirationTimestamp = Math.floor(Date.now() / 1000) + 25; // oneDayInSeconds;

        const token = jwt.sign(
          { email: user.email, id: user._id, role: r },
          "hjdbsbdqkjdbqksjdbqkjsdbqksdbqksdbjqsdbjqdsb",
          { expiresIn: oneDayInSeconds }
        );

        res.cookie("access_token", token, {
          // httpOnly: true,
          maxAge: 86400, // oneDayInSeconds, // Convert to milliseconds
          path: "/",
          domain: "localhost", // Removed "http://" from the domain
        });

        res.status(200).json({
          message: "Login successful",
          data: {
            email: user.email,
            _id: user._id,
            role: user.Role,
            name: user.Nom,
          },
        });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}


async function logout (req, res)  {
  try {
    // Clear the cookie containing the access token
    res.clearCookie("access_token", { path: "/" });

    // Optionally, you can add additional logic here,
    // such as invalidating the token server-side if needed.

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  register,
  login,
logout,
};
