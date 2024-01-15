const mongoose = require("mongoose");
const { Schema } = mongoose;
const resourceSchema = new mongoose.Schema({
  NomEnseignant: { type: String, required: true },
  Niveau: { type: String, required: true },
  Matiere: { type: String, required: true },
  Nature:String,
  Document: {
    url: {
      type: String,
    },
    public_id: String,
  },
  Trimestre: { type: String, required: true },
});
const Resource = mongoose.model("Resource", resourceSchema);
module.exports = Resource;
