var User = require('../models/users')
const mongoose = require('mongoose')
var fs = require('fs')
var path = require('path')

module.exports.listar = () => {
    return User
        .find()
        .exec()
}

module.exports.listarFriends = id => {
    return User
        .find({amigos : id})
        .exec()
}

module.exports.consultar = id => {
    return User
        .findOne({email: id})
        .exec()
}

module.exports.inserir = user => {
    user._id = mongoose.Types.ObjectId()
    user.amigos = []
    var novo = new User(user)
    return novo.save()
}

module.exports.doficheiro = (file) => {
    //executar java
    const dir = path.resolve(__dirname + '/../testes')
    const jardir = path.resolve(__dirname + '/../controllers/mongo_import.jar')
    var exec = require('child_process').exec;
    var child = exec('java -jar ' + jardir + ' ' + path.join(dir,file),
    function (error, stdout, stderr){
        console.log('Output -> ' + stdout)
        if(error !== null){
            console.log("Error -> "+error)
        }

        fs.unlink(path.join(dir, file), err => {
            if (err) throw err
        })
    })
}


module.exports.import = (file) => {
    //executar java
    const dir = path.resolve(__dirname + '/../testes')
    var exec = require('child_process').exec;
    var child = exec('mongoimport -d LinkedSharing -c users --jsonArray ' + path.join(dir,file),
    function (error, stdout, stderr){
        console.log('Output -> ' + stdout)
        if(error !== null){
            console.log("Error -> "+error)
        }

        fs.unlink(path.join(dir, file), err => {
            if (err) throw err
        })
    })
}


module.exports.inserirFriend = (user,friend) => {
    return User
        .updateOne( {email : user},{ $push: {amigos: friend } })
        .exec()
}

module.exports.removerFriend = (user,friend) => {
    return User
        .updateOne( {email : user},{ $pull: {amigos: friend } })
        .exec()
}

module.exports.eliminar = id => {
    return User
        .deleteOne({email: id})
        .exec()
}