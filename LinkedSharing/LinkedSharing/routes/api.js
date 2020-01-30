const express = require('express');
const router = express.Router();
var passport = require('passport')

var multer = require('multer')
var upload = multer({dest:'public/files'})
var forms = multer({dest: 'testes'})

var Pubs = require('../controllers/pubs')
var Users = require('../controllers/users')

// Users
router.get('/users', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  Users.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/users/friends/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  Users.listarFriends(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/users/add/:user/:friend', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    Promise.all([
      Users.inserirFriend(req.params.user,req.params.friend),
      Users.inserirFriend(req.params.friend,req.params.user)
    ])
      .then(([d1,d2]) => res.jsonp(d2))
      .catch(erro => res.status(500).jsonp(erro))
});

router.get('/users/remove/:user/:friend', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    Promise.all([
      Users.removerFriend(req.params.user,req.params.friend),
      Users.removerFriend(req.params.friend,req.params.user)
    ])
      .then(([d1,d2]) => res.jsonp(d2))
      .catch(erro => res.status(500).jsonp(erro))
});

router.get('/users/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  Users.consultar(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});


router.post('/users', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  Users.inserir(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});


router.post('/form', forms.array('ficheiro'), function(req, res, next) {
  Users.doficheiro(req.files[0].filename)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});


router.delete('/users/:id', passport.authenticate('jwt', {session: false}), function(req,res,next){
  Users.eliminar(req.params.id)
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
});

router.post('/import', forms.array('ficheiro'), passport.authenticate('jwt', {session: false}), function(req,res,next){
  Users.import(req.files[0].filename)
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
});


router.get('/export', passport.authenticate('jwt', {session: false}), function(req,res){
  Promise.all([
    Users.listar(),
    Pubs.listar()
  ])
    .then(([d1,d2]) => res.jsonp({ "users" : d1, "pubs" : d2}))
    .catch(erro => {res.status(500).jsonp(erro)})
})





//Posts
router.get('/pubs', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  Pubs.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/pubs/posts', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  Pubs.listarPosts()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/pubs/events', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  Pubs.listarEvents()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/pubs/classifiers', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  Pubs.listarClassificador()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/pubs/classifiers/:clas', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  Pubs.consultarPorClas(req.params.clas)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/pubs/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  Pubs.consultar(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.post('/pubs', passport.authenticate('jwt', {session: false}), upload.array('ficheiro'), function(req, res, next) {
  Pubs.inserir(req.body, req.files)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.post('/pubs/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  Pubs.inserirComentario(req.params.id,req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.delete('/pubs/:id', passport.authenticate('jwt', {session: false}), function(req,res,next){
  Pubs.eliminar(req.params.id)
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
});


module.exports = router