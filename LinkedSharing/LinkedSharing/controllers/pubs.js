var Pub = require('../models/pubs')
const mongoose = require('mongoose')

module.exports.listar = () => {
    return Pub
        .find()
        .sort({dataCriacao:-1})
        .exec()
}

module.exports.listarPosts = () => {
    return Pub
        .find({tipo : "Post"})
        .sort({dataCriacao:-1})
        .exec()
}

module.exports.listarEvents = () => {
    return Pub
        .find({tipo : "Event"})
        .sort({dataCriacao:-1})
        .exec()
}

module.exports.consultar = id => {
    return Pub
        .findOne({_id: id})
        .exec()
}

module.exports.listarClassificador = () => {
    return Pub
        .distinct("classificador")
        .exec()
}


module.exports.consultarPorClas = clas => {
    return Pub
        .find({classificador: clas})
        .exec()
}

module.exports.inserir = (pub, files) => {
    pub._id = mongoose.Types.ObjectId()
    var date = new Date()
    var string_date = (((date.getUTCDate()).toString().length > 1) ? date.getUTCDate().toString() : "0" + date.getUTCDate().toString()) + "/" + (((date.getMonth() + 1).toString().length > 1) ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1).toString()) + "/" + (date.getFullYear()).toString()
    var string_time = (((date.getHours()).toString().length > 1) ? (date.getHours()).toString() : "0" + (date.getHours()).toString()) + ":" + ((date.getMinutes()).toString().length > 1 ? (date.getMinutes()).toString() : "0" + (date.getMinutes()).toString())+ ":" + (date.getSeconds()).toString()
    pub.dataCriacao = string_date + " " + string_time
    pub.comentarios = []
    pub.ficheiros = []
    
    for(let i = 0; i < files.length; i++){
        pub.ficheiros[i]={}
        pub.ficheiros[i].name = files[i].originalname
        pub.ficheiros[i].filename = files[i].filename
        pub.ficheiros[i].mimetype = files[i].mimetype
        pub.ficheiros[i].size = files[i].size
    }

    console.log(pub)
    var novo = new Pub(pub)
    return novo.save()
}

module.exports.inserirComentario = (id,com) => {
    var criador = com.criador
    var texto = com.texto
    return Pub
        .update({_id:mongoose.Types.ObjectId(id)},{$push : {comentarios : {criador : criador,texto:texto}}})
        .exec()
}

module.exports.eliminar = id => {
    return Pub
        .deleteOne({_id: id})
        .exec()
}