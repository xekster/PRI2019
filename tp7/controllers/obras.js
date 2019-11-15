var Obra = require('../models/obras')


//devolve lista de comps

module.exports.listarObras = () => {
    return Obra
        .find()
        .exec()
}

module.exports.periodo = periodo => {
    return Obra
        .find({periodo: periodo})
        .exec()
}

module.exports.ano = ano => {
    return Obra
        .find({anoCriacao: ano})
        .exec()
}

module.exports.comp = nome => {
    return Obra
        .find({compositor: nome})
        .exec()
}


module.exports.listarComp = () => {
    return Obra
        .distinct('compositor')
        .exec()
}

