// Importa as dependências
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const passport = require('passport');
const database = require('./config/database');

// create a stdout console logger
const log = require('simple-node-logger').createSimpleLogger('../siteGEELLI.log');

// Define a porta 
const porta = process.env.port || 80;
//const porta = process.env.port || 8080;


// Passport é o módulo que cuida da parte de autorizar ou não o usuário a acessar as páginas
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Chama algumas funções importantes
app.use(cors());

// Para suportar parâmetros URL Encodeed
app.use(bodyParser.urlencoded({
    extended: true
}));

// Tentando conectar no banco de dados
database.getConnection((err, conn) => {
    log.info('[Site GEELLI] Se conectanto ao banco de dados ' + database.user + '@' + database.host + ':3306');
    if (err) {
        log.info('[Site GEELLI] Não foi possível se conectar ao banco de dados');
        log.info('[Site GEELLI] Encerrando servidor...');
        process.exit();
    } else {
        log.info('[Site GEELLI] Conectado ao banco de dados');
        conn.release
    } 
});

// Configurando rotas básicas
// Se chamar a página principal, manda index.html
app.get('/', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /');
    res.sendFile(path.join(__dirname, 'public_html/index.html'));
});

// Se chamar a página estática, manda página estática
app.get('/artigosLinguagem', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /artigosLinguagem');
    res.sendFile(path.join(__dirname, 'public_html/artigosLinguagem.html'));
});

app.get('/artigosLiteratura', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /artigosLiteratura');
    res.sendFile(path.join(__dirname, 'public_html/artigosLiteratura.html'));
});

app.get('/eventos', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /eventos');
    res.sendFile(path.join(__dirname, 'public_html/eventos.html'));
});

app.get('/integrantes', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /integrantes');
    res.sendFile(path.join(__dirname, 'public_html/integrantes.html'));
});

app.get('/multimidia', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /multimidia');
    res.sendFile(path.join(__dirname, 'public_html/multimidia.html'));
});

app.get('/projeto', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /projeto');
    res.sendFile(path.join(__dirname, 'public_html/projeto.html'));
});

app.get('/noticias', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /noticias');
    res.sendFile(path.join(__dirname, 'public_html/noticias.html'));
});

app.get('/GEELLI', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /noticias');
    res.sendFile(path.join(__dirname, 'public_html/GEELLI.html'));
});

app.get('/ISELP', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /noticias');
    res.sendFile(path.join(__dirname, 'public_html/ISELP.html'));
});

app.get('/algumasFotos', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /noticias');
    res.sendFile(path.join(__dirname, 'public_html/algumasFotos.html'));
});

app.get('/sarauXI', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /noticias');
    res.sendFile(path.join(__dirname, 'public_html/sarauXI.html'));
});

// Se chamar /usuarios, manda /usuarios
const usuarios = require('./rotas/usuarios');
app.use('/usuarios', usuarios);

// Se chamar /eventos, manda /eventos
const eventos = require('./rotas/eventos');
app.use('/eventos', eventos);

// Se chamar /mensagens, manda /mensagens
const mensagens = require('./rotas/mensagens');
app.use('/mensagens', mensagens);

// Se chamar arquivo, manda arquivo
app.get('*', (req, res) => {
    //log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL ' + req.params[0]);
    res.sendFile(path.join(__dirname, 'public_html/' + req.params[0]));
});

app.listen(porta, (err) => {
    log.info('[Site GEELLI] Servidor ouvindo porta ' + porta);
});
