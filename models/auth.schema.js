const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Nom : {type: String, required: true },
  Prenom : {type: String, required: true },
  Adressepostale: {type: String, required: true },
  Role : {type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
