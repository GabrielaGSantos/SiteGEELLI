var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var server = http.createServer(app);

//Definir a porta
var porta = process.env.PORT || 8080;

//iniciar servidor
app.listen(porta, function(){
    console.log("Escutando na porta " + porta);
});

//retornar index
app.get("/", function (req,res){
    res.sendFile(__dirname + "/Site/index.html");
});

//retorna qualquer arquivo
app.get(/^(.+)$/, function(req,res){
    res.sendFile(__dirname + "/Site/" + req.params[0]);
});