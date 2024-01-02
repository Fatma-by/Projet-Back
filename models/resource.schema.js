const mongoose = require('mongoose');
const { Schema } = mongoose;
const resourceSchema = new mongoose.Schema({
    NomEnseignat : {type: String, required: true },
    Niveau : {type: String, required: true },
    Matiere: {type: String, required: true },
    Document:{ type: String, required: true},
    Trimestre:{ type: String, required: true},

    
  });

module.exports =  mongoose.model('Resource', resourceSchema);