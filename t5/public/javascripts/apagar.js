function apagaItem(ident){
    console.log('Vou apagar o aluno: ' + ident)
    axios.delete('/alunos/' + ident)
        .then(response => window.location.assign('/alunos'))
        .catch(error => console.log(error))
}