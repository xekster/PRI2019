const express = require ('express')
const router = express.Router()
//const axios = require('axios')

var Filmes = require('../controllers/filmes')

/* GET: lista de filmes*/
router.get('/filmes', function (req, res){
    Filmes.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

/* GET: recupera info do filme */
router.get('/filmes/:id', function (req, res){
    Filmes.consultar(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

//POST: inserir filme
router.post('/filmes', function (req, res){
    Filmes.inserir(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})


module.exports = router