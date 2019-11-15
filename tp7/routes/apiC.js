const express = require ('express')
const router = express.Router()
//const axios = require('axios')

var Obras = require('../controllers/obras')

/* GET: recupera info do comp */
router.get('/:nome', function (req, res){
    Obras.comp(req.params.nome)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})


/* GET: recupera info varias obras */

router.get('/', function (req, res){
    console.log(req.params)
    Obras.listarComp()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})


module.exports = router