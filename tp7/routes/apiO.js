const express = require ('express')
const router = express.Router()


var Obras = require('../controllers/obras')

/* GET: recupera info varias obras */

router.get('/', function (req, res){
  if(req.query.anoCriacao)
    Obras.ano(req.query.anoCriacao)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  
  else if(req.query.periodo)
    Obras.periodo(req.query.periodo)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  
  else if(req.query.compositor)
    Obras.comp(req.query.compositor)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  
  else
    Obras.listarObras()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})



module.exports = router