var express = require('express');
var router = express.Router();
var axios = require('axios')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var multer = require ('multer')
var upload = multer({dest:'uploads/'})
var fs = require('fs')
var request = require('request')
const path = require('path');

router.get('/',function(req,res,next){
    res.render('form-user');
});

router.post('/', function(req,res){
    var hash = bcrypt.hashSync(req.body.password, 10);
    var token = jwt.sign({}, "linksh", 
    {
        expiresIn: 3000, 
        issuer: "Servidor myAgenda"
    })
    axios.post('http://localhost:3004/api/users?token=' + token, {
        email: req.body.email,
        nome: req.body.nome,
        password: hash,
        universidade : req.body.universidade,
        ano : req.body.ano,
        curso : req.body.curso
    })
    .then(dados => res.redirect('/'))
    .catch(e => res.render('error', {error: e}))
})

router.post('/import', upload.array('ficheiro'), function(req,res){
    var token = jwt.sign({}, "linksh", 
    {
        expiresIn: 3000, 
        issuer: "Servidor myAgenda"
    })
    var r = request.post('http://localhost:3004/api/import?token=' + token, function optionalCallback(err, httpResponse, body){
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Post upload successful!  Server responded with:', body);

        const dir = path.resolve(__dirname + '/../uploads')

        fs.readdir(dir, (err, files) => {
            if(err) throw err

            for(const file of files){
                fs.unlink(path.join(dir, file), err => {
                    if (err) throw err
                })
            }
        })
        res.redirect('/')
    })
    console.log(req.files)
    var form = r.form()
    form.append('nome', req.files[0].originalname)
    var oldp = __dirname + '/../' + req.files[0].path
    var newp = __dirname + '/../uploads/' + req.files[0].originalname
    fs.renameSync(oldp, newp)
    form.append('ficheiro', fs.createReadStream(newp))
})


router.post('/form', upload.array('ficheiro'), function(req,res){

    var r = request.post('http://localhost:3004/api/form', function optionalCallback(err, httpResponse, body){
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Post upload successful!  Server responded with:', body);

        const dir = path.resolve(__dirname + '/../uploads')

        fs.readdir(dir, (err, files) => {
            if(err) throw err

            for(const file of files){
                fs.unlink(path.join(dir, file), err => {
                    if (err) throw err
                })
            }
        })
        res.redirect('/linkedsharing')
    })
    console.log(req.files)
    var form = r.form()
    form.append('nome', req.files[0].originalname)
    var oldp = __dirname + '/../' + req.files[0].path
    var newp = __dirname + '/../uploads/' + req.files[0].originalname
    fs.renameSync(oldp, newp)
    form.append('ficheiro', fs.createReadStream(newp))

})


router.get('/export', function(req,res){
    var token = jwt.sign({}, "linksh", 
      {
          expiresIn: 3000, 
          issuer: "Servidor myAgenda"
      })
      axios.get('http://localhost:3004/api/export?token=' + token)
        .then(response =>{
          res.jsonp(response.data)
        })
        .catch(erro => res.status(500).jsonp(erro))
  })

module.exports = router;
