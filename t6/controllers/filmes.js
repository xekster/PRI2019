var Filme = require('../models/filmes')

//const Filmes = module.exports  //, pode ser usado mas depois fica Filmes.listar...

//devolve lista de alunos

module.exports.listar = () => {
    return Filme
        .find()
        .exec()
}

module.exports.consultar = () => {
    return Filme
        .findOne({_id: id})
        .exec()
}

module.exports.contar = () => {
    return Filme
        .countDocuments()
        .exec()
}


module.exports.inserir = filme =>  {
    var novo = new Filme(filme)
    return novo.save()
}