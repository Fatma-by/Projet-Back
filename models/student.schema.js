const mongoose = require("mongoose");
const { Schema } = mongoose;
const Class = require("./class.schema");

const studentSchema = new mongoose.Schema({
  NomStudent: { type: String, required: true },
  PrenomStudent: { type: String, required: true },
  Code: { type: String, required: true },
  class: { type: String,  default: "" },
});

module.exports = mongoose.model("Student", studentSchema);


