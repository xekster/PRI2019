const express = require ('express')
const router = express.Router()


var Comp = require('../controllers/pubs')



/* GET: recupera info do compositor */

router.get('/pubs/:id', function (req, res){
  Comp.pubid(req.params.id)
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})


router.get('/pubs', function (req, res){
  if(req.query.type && req.query.year)
    Comp.pubtypeyear(req.query.type, req.query.year)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  else if(req.query.type)
    Comp.pubtype(req.query.type)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  else if(req.query.autor)
    Comp.pubautor(req.query.autor)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  else
    Comp.pubs()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})


router.get('/types', function (req, res){
  Comp.tipos()
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})

router.get('/autores', function (req, res){
  Comp.autores()
  .then(dados => res.jsonp(dados.sort()))
  .catch(erro => res.status(500).jsonp(erro))
})


module.exports = router