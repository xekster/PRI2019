var express = require('express');
var router = express.Router();
var axios = require('axios')
var passport = require('passport')
var jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/linkedsharing', function(req, res, next) {
    res.render('frontpage')
});

router.post('/linkedsharing', passport.authenticate('local', 
{ successRedirect: '/',
  successFlash: 'Utilizador autenticado com sucesso!',
  failureRedirect: '/linkedsharing',
  failureFlash: 'Utilizador ou password inválido(s)...'
})
);

router.get('/logout', verificaAutenticacao, function(req,res){
  req.logout()
  req.session.destroy()
  res.redirect('/linkedsharing')
})

router.get('/file/:nome', verificaAutenticacao, function(req,res){
  var token = jwt.sign({}, "linksh", 
    {
        expiresIn: 3000, 
        issuer: "Servidor myAgenda"
    })
    axios.get('http://localhost:3004/files/'+ req.params.nome + '?token=' + token, {responseType: "stream"})
      .then(response =>{
        response.data.pipe(res)
      })
      .catch(erro => res.status(500).jsonp(erro))
})

router.get('/', verificaAutenticacao, function(req, res, next) {
  var id = req.session.passport.user
  var token = jwt.sign({}, "linksh", 
    {
        expiresIn: 3000, 
        issuer: "Servidor myAgenda"
    })
  if(id == 'admin@admin.pt'){
    var usrs = 'http://localhost:3004/api/users?token=' + token
    var psts = 'http://localhost:3004/api/pubs?token=' + token
    const req1 = axios.get(usrs)
    const req2 = axios.get(psts)
    axios.all([req1,req2])
    .then(axios.spread((usr,pst) =>{
        res.render('admin',{users:usr.data,posts:pst.data});
      }))
      .catch(erro => {
          res.render('error', {error: erro})
      })
  } else {
    var info = 'http://localhost:3004/api/users/' + id + '?token=' + token
    var post = 'http://localhost:3004/api/pubs' + '?token=' + token
    var frnd = 'http://localhost:3004/api/users/friends/' + id + '?token=' + token
    var cl = 'http://localhost:3004/api/pubs/classifiers' + '?token=' + token 
    const req1 = axios.get(info)
    const req2 = axios.get(post)
    const req3 = axios.get(frnd)
    const req4 = axios.get(cl)


    axios.all([req1,req2,req3,req4])
      .then(axios.spread((usr,pst,frd,cla) =>{
          res.render('feed', {user: usr.data,posts: pst.data,friends: frd.data,clas : cla.data});
        }))
        .catch(erro => {
            res.render('error', {error: erro})
        })
  }
});

router.get('/profile/:email', verificaAutenticacao, function(req, res, next) {
  var id = req.params.email
  if (id == req.session.passport.user){
    res.redirect('/')
  } else {
      var token = jwt.sign({}, "linksh", 
        {
            expiresIn: 3000, 
            issuer: "Servidor myAgenda"
        })
      
      var info = 'http://localhost:3004/api/users/' + id + '?token=' + token
      var post = 'http://localhost:3004/api/pubs' + '?token=' + token
      var frnd = 'http://localhost:3004/api/users/friends/' + id + '?token=' + token
      var cl = 'http://localhost:3004/api/pubs/classifiers' + '?token=' + token 
      const req1 = axios.get(info)
      const req2 = axios.get(post)
      const req3 = axios.get(frnd)
      const req4 = axios.get(cl)
      axios.all([req1,req2,req3,req4])
        .then(axios.spread((usr,pst,frd,cla) =>{
            res.render('feedprofile', {user: usr.data,posts: pst.data,friends: frd.data,clas : cla.data});
          }))
          .catch(erro => {
              res.render('error', {error: erro})
          })
  }
});

router.get('/add/:friend', verificaAutenticacao, function(req, res, next) {
  var token = jwt.sign({}, "linksh", 
    {
        expiresIn: 3000, 
        issuer: "Servidor myAgenda"
    })
    axios.get('http://localhost:3004/api/users/add/'+ req.session.passport.user +"/" + req.params.friend +'?token=' + token)
      .then(dados => res.redirect('/'))
      .catch(erro => res.status(500).jsonp(erro))
});

router.get('/remove/:friend', verificaAutenticacao, function(req, res, next) {
  var token = jwt.sign({}, "linksh", 
    {
        expiresIn: 3000, 
        issuer: "Servidor myAgenda"
    })
    axios.get('http://localhost:3004/api/users/remove/'+ req.session.passport.user +"/" + req.params.friend +'?token=' + token)
      .then(dados => res.redirect('/'))
      .catch(erro => res.status(500).jsonp(erro))
});



router.get('/listusers', verificaAutenticacao, function(req, res, next) {
  var token = jwt.sign({}, "linksh", 
    {
        expiresIn: 3000, 
        issuer: "Servidor myAgenda"
    })
    axios.get('http://localhost:3004/api/users?token=' + token)
      .then(dados => res.render('list-users',{user: req.session.passport.user,users: dados.data}))
      .catch(erro => res.status(500).jsonp(erro))
});

function verificaAutenticacao(req,res,next){
  if(req.isAuthenticated()){
    next();
  } else{
    res.redirect("/linkedsharing");}
}

module.exports = router;
