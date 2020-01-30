var express = require('express');
var router = express.Router();
var axios = require('axios')
var jwt = require('jsonwebtoken')
var multer = require ('multer')
var upload = multer({dest:'uploads/'})
var request = require('request')
var fs = require('fs')
const path = require('path');


 
router.post('/comment/:idCom', function(req,res){
    var obj = {};
    obj['criador'] = req.session.passport.user
    obj['texto'] = req.body.texto
    var token = jwt.sign({}, "linksh", 
    {
        expiresIn: 3000, 
        issuer: "Servidor myAgenda"
    })
    axios.post('http://localhost:3004/api/pubs/' + req.params.idCom + '?token=' + token , obj)
        .then(dados => {
            res.redirect('/')
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

router.get('/posts', function(req,res){
    var token = jwt.sign({}, "linksh", 
    {
        expiresIn: 3000, 
        issuer: "Servidor myAgenda"
    })
    
    const req1 = axios.get('http://localhost:3004/api/pubs/posts?token=' + token)
    const req2 = axios.get('http://localhost:3004/api/users/' + req.session.passport.user + '?token=' + token)
    axios.all([req1,req2])
    .then(axios.spread((pb,usr) =>{
        res.render('pubs-posts',{user: usr.data,pubs: pb.data})}))
    .catch(erro => {
        res.render('error', {error: erro})
    })
});

router.get('/events', function(req,res){
    var token = jwt.sign({}, "linksh", 
    {
        expiresIn: 3000, 
        issuer: "Servidor myAgenda"
    })
    const req1 = axios.get('http://localhost:3004/api/pubs/events?token=' + token)
    const req2 = axios.get('http://localhost:3004/api/users/' + req.session.passport.user + '?token=' + token)
    axios.all([req1,req2])
    .then(axios.spread((pb,usr) =>{
        res.render('pubs-events',{user: usr.data,pubs: pb.data})}))
    .catch(erro => {
        res.render('error', {error: erro})
    })
})




router.get('/classifier/:id', function(req,res){
    var token = jwt.sign({}, "linksh", 
    {
        expiresIn: 3000, 
        issuer: "Servidor myAgenda"
    })
    const req1 = axios.get('http://localhost:3004/api/pubs/classifiers/' + req.params.id + '?token=' + token)
    const req2 = axios.get('http://localhost:3004/api/users/' + req.session.passport.user + '?token=' + token)
    axios.all([req1,req2])
    .then(axios.spread((pb,usr) =>{
        res.render('clas-pubs',{user : usr.data, clas: req.params.id, pubs: pb.data})}))
    .catch(erro => {
        res.render('error', {error: erro})
    })
    
})

router.post('/post', upload.array('ficheiro'), function(req,res){
    var token = jwt.sign({}, "linksh", 
    {
        expiresIn: 3000, 
        issuer: "Servidor myAgenda"
    })
    var r = request.post('http://localhost:3004/api/pubs?token=' + token, function optionalCallback(err, httpResponse, body){
        if (err) {
            return console.error('upload failed:', err);
        }

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

    var form = r.form()
    form.append('criador', req.session.passport.user)
    form.append('classificador', req.body.classificador)
    form.append('tipo', 'Post')
    form.append('texto', req.body.texto)

    for(var i = 0; i < req.files.length; i++){
        var oldp = __dirname + '/../' + req.files[i].path
        var newp = __dirname + '/../uploads/' + req.files[i].originalname

        fs.renameSync(oldp, newp)

        form.append('ficheiro', fs.createReadStream(newp))
        
    }

})


router.post('/event', upload.array('ficheiro'), function(req,res){
    var token = jwt.sign({}, "linksh", 
    {
        expiresIn: 3000, 
        issuer: "Servidor myAgenda"
    })
    
    var r = request.post('http://localhost:3004/api/pubs?token=' + token, function optionalCallback(err, httpResponse, body){
        if (err) {
            return console.error('upload failed:', err);
        }

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
    
    var form = r.form()
    
    var sd = req.body.date.split('-')
    var st = req.body.time.split(':')
    if(sd[0] && sd[1] && sd[2])
        var string_date = ((sd[2].length > 1) ? sd[2] : "0" + sd[2]) + "/" + ((sd[1].length > 1) ? sd[1] : "0" + sd[1])+ "/" + ((sd[0].length > 1) ? sd[0] : "0" + sd[0])
    else
        var string_date = "00/00/0000"
    if(st[0] && st[1])
        var string_time = ((st[0].length > 1) ? st[0] : "0" + st[0]) + ":" + ((st[1].length > 1) ? st[1] : "0" + st[1]) + ":00"
    else
        var string_time = "00:00:00"

    

    form.append('criador', req.session.passport.user)
    form.append('classificador', req.body.classificador)
    form.append('tipo', 'Event')
    form.append('titulo', req.body.titulo)
    form.append('texto', req.body.texto)
    form.append('dataRealizar', string_date + " " + string_time)
    
    for(var i = 0; i < req.files.length; i++){
        var oldp = __dirname + '/../' + req.files[i].path
        var newp = __dirname + '/../uploads/' + req.files[i].originalname

        fs.renameSync(oldp, newp)

        form.append('ficheiro', fs.createReadStream(newp))        
    }

})

router.get('/delete/:id', function(req,res){
    var token = jwt.sign({}, "linksh", 
    {
        expiresIn: 3000, 
        issuer: "Servidor myAgenda"
    })
    axios.delete('http://localhost:3004/api/pubs/' + req.params.id + '?token=' + token)
    .then(dados => {
        res.redirect('/')
    })
    .catch(erro => {
        res.render('error', {error: erro})
    })
})
  

module.exports = router;
