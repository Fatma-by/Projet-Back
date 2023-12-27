const mongoose = require('mongoose');
const { Schema } = mongoose;
const User  = require('./auth.schema');

const classSchema = new mongoose.Schema({
    NomClass : {type: String, required: true, unique: true },
    Niveau : {type: String, required: true },
    Matiere: {type: String, required: true },
    user:{ type: String }
    
  });

module.exports =  mongoose.model('Class', classSchema);
