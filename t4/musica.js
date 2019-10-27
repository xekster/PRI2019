var http = require('http')
var fs = require('fs')


var myserver = http.createServer(function (req, res){
    var request = req.url.split("/")

    if(req.method == 'GET'){

        if(request[1] == 'musica'){

            if(request[2]== 'w3.css'){
                fs.readFile('w3.css', (erro,dados)=>{
                    console.log("retornar o css")
                    if(!erro){
                        res.writeHead(200, {'Content-Type': 'text/css'})
                        res.write(dados)
                    }
                    else{
                        res.writeHead(200, {'Content-Type': 'text/plain'})
                        res.write('Erro na leitura do w3.css')
                    }
                    res.end()
                })
            }

            else if (request[2]=='doc2html.xsl'){
                console.log("entrei na coisa do doc2html")
                fs.readFile('data/doc2html.xsl', (erro,dados)=>{
                    if(!erro){
                        res.writeHead(200, {'Content-Type': 'text/xsl'})
                        res.write(dados)
                    }
                    else{
                        res.writeHead(200, {'Content-Type': 'text/plain'})
                        res.write('Erro na leitura do doc2html.xsl')
                    }
                    res.end()
                })
            }

            else {
                console.log("recieved request " + request[2])
                var pat = "data/doc" + request[2] + ".xml"
                console.log("looking at " + pat)
                fs.readFile(pat, (erro,dados)=>{
                    if(!erro){
                        res.writeHead(200, {'Content-Type': 'text/xml'})
                        res.write(dados)
                    }
                    else{
                        res.writeHead(200, {'Content-Type': 'text/plain'})
                        res.write('Erro na leitura do xml da musica ' + request[1])
                    }
                    res.end()
                })
            }
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/plain'})
            res.write('Get nao suportado')
            res.end()
        }
    }
    else{
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write('Pedido nao suportado')
        res.end()
    }

})

myserver.listen(3022)
