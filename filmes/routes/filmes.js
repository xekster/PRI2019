var express = require('express');
var router = express.Router();
var axios = require ('axios')

/* GET users listing. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:3004/api/filmes')
      .then(dados => {
          res.render('lista-filmes', { lista: dados.data})
      })
      .catch(erro => {
          res.render('error', {error: erro})
      })
  
})

router.get('/inserir', function(req, res, next) {
  res.render('form-filme')
})

router.post('/', function(req, res, next) {
  axios.post('http://localhost:3004/api/filmes', req.body)
      .then(dados => {
          res.redirect('/')
      })
      .catch(erro => {
          res.render('error', {error: erro})
      })
})

module.exports = router