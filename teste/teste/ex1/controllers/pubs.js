var Comp = require('../models/pubs')


module.exports.pubs = () => {
    return Comp
        .find({},{id:1, title:1, year:1, type:1, _id:0})
        .exec()
}


module.exports.pubid = id => {
    return Comp
        .findOne({id: id})
        .exec()
}


module.exports.pubtype = t => {
    return Comp
        .find({type:t})
        .exec()
}

module.exports.pubtypeyear = (t, y) => {
    console.log(t + y)
    return Comp
        .find({$and:[{type:t},{year:{$gt:y}}]})
        .exec()
}

module.exports.pubautor = a => {
    return Comp
        .find({authors:a})
        .exec()
}

module.exports.autores= () => {
    return Comp
        .distinct("authors")
        .exec()
}

module.exports.tipos = () => {
    return Comp
        .distinct("type")
        .exec()
}

