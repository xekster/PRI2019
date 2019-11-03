var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var nanoid = require('nanoid')
var myBD = __dirname + "/../data/alunos.json"


/* GET home page alunos */
router.get('/alunos', function(req, res) {
  jsonfile.readFile(myBD, (erro, dados) => {
    if(!erro){
        res.render('index', {lista: dados})              
    }
    else{
        res.render('error', {error: erro})  
    }
  }) 
})

/* GET single aluno */
router.get('/alunos/:idAluno', function(req, res) {
  var id = req.params.idAluno
  jsonfile.readFile(myBD, (erro, alunos) => {
    if(!erro){
        var mate = alunos.find(c => c.id == id)
        res.render('single', {mate})              
    }
    else{
        res.render('error', {error: erro})  
    }
  }) 
})


/* POST new aluno  */
router.post('/alunos', function(req, res) {
  var registo = req.body
  registo['id'] = nanoid()
  jsonfile.readFile(myBD, (erro, alunos)=>{
      if(!erro){
          alunos.push(registo)
          jsonfile.writeFile(myBD, alunos, erro => {
              if(erro) console.log(erro)
              else console.log('Registo gravado com sucesso.')
          })
      }
      res.render('index', {lista: alunos})
  })
})

/* TODO POST notas  */
router.post('/alunos/:idAluno/notas', function(req, res) {
  var registo = req.body
  jsonfile.readFile(myBD, (erro, alunos)=>{
      if(!erro){
          alunos.push(registo)
          jsonfile.writeFile(myBD, alunos, erro => {
              if(erro) console.log(erro)
              else console.log('Registo gravado com sucesso.')
          })
      }
      res.render('index', {lista: alunos})
  })
})


/* TODO DELETE aluno*/
router.delete('/alunos/:idAluno/notas/:indicador', function(req, res) {
  var id = req.params.idAluno
  jsonfile.readFile(myBD, (erro, alunos)=>{
    if(!erro){
      var index = alunos.findIndex(c => c.id == id)
      if(index > -1){
        alunos.splice(index, 1)
        jsonfile.writeFile(myBD, alunos, erro => {
          if(erro) console.log(erro)
          else console.log('Registo removido com sucesso.')
        })
      }
    }
    res.render('index', {lista: alunos})
  })
})



/*DELETE aluno*/
router.delete('/alunos/:idAluno', function(req, res) {
  var id = req.params.idAluno
  jsonfile.readFile(myBD, (erro, alunos)=>{
    if(!erro){
      var index = alunos.findIndex(c => c.id == id)
      if(index > -1){
        alunos.splice(index, 1)
        jsonfile.writeFile(myBD, alunos, erro => {
          if(erro) console.log(erro)
          else console.log('Registo removido com sucesso.')
        })
      }
    }
    res.render('index', {lista: alunos})
  })
})





module.exports = router;
