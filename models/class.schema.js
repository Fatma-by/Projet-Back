const mongoose = require('mongoose');
const classSchema = new mongoose.Schema({
    NomClass : {type: String, required: true },
    Niveau : {type: String, required: true },
    Matiere: {type: String, required: true },
    
  });

  const Class = mongoose.model('Class', classSchema);

module.exports = Class;