const mongoose = require("mongoose");
const { Schema } = mongoose;
const Class  = require('./class.schema');

const studentSchema = new mongoose.Schema({
  NomStudent: { type: String, required: true },
  PrenomStudent: { type: String, required: true },
  AdressMail: { type: String, required: true, unique: true },
  class: { type: String }
 
});

module.exports = mongoose.model("Student", studentSchema);


