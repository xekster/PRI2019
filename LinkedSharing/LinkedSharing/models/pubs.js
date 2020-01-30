const mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
    criador : String,
    texto : String
})

var fileSchema = new mongoose.Schema({
    name : String,
    filename : String,
    mimetype: String,
    size : Number
})

var pubSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tipo: String, // Post or Event
    titulo: String, // Event
    dataRealizar: String, //Event
    texto: String,
    criador : String,
    dataCriacao : String,
    classificador : String,
    comentarios : [commentSchema], 
    ficheiros: [fileSchema]
})

module.exports = mongoose.model('pubs', pubSchema)