var express = require('express');
var router = express.Router();
var axios = require ('axios')
var key = '?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ'

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  axios.all([
      axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' +req.params.id + key),
      axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' + req.params.id + '/elementos' + key),
      axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' + req.params.id + '/intervencao/dono' + key),
      axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' + req.params.id + '/intervencao/participante' + key)
  ])
      .then(axios.spread((self, elem, dono, part) => {
          res.render('tipo', { lista: self.data, elem:elem.data, dono:dono.data, part:part.data})
      }))
      .catch(erro => {
          res.render('error', {error: erro})
      })
  
})

module.exports = router;
