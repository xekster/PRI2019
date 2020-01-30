const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
	password: String,
	nome: String,
	universidade: String,
	ano: String,
	curso: String,
	amigos: [String]
})

module.exports = mongoose.model('users', userSchema)