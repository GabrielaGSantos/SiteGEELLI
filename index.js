// Importa as dependências
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const passport = require('passport');
const database = require('./config/database');

// Define a porta 
const porta = process.env.port || 80;

// Chama algumas funções importantes
app.use(cors());

// Para suportar parâmetros URL Encodeed
app.use(bodyParser.urlencoded({
    extended: true
}));

// Tentando conectar no banco de dados
database.connect((err) => {
    console.log('[Site GEELLI] Se conectanto ao banco de dados ' + database.user + '@' + database.host + ':3306');
    if (err) {
        console.log('[Site GEELLI] Não foi possível se conectar ao banco de dados');
        console.log('[Site GEELLI] Encerrando servidor...');
        process.exit();
    } else
        console.log('[Site GEELLI] Conectado ao banco de dados');
});

// Define a pasta onde estão as páginas estáticas
app.use(express.static(path.join(__dirname, 'public_html')));

// Configurando rotas básicas
// Se chamar a página principal, manda index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html/index.html'));
});

// Se chamar a página estática, manda página estática
app.get('/artigos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html/artigos.html'));
});

app.get('/eventos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html/eventos.html'));
});

app.get('/integrantes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html/integrantes.html'));
});

app.get('/multimidia', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html/multimidia.html'));
});

app.get('/projeto', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html/projeto.html'));
});

// Se chamar /usuarios, manda /usuarios
const usuarios = require('./rotas/usuarios');
app.use('/usuarios', usuarios);

// Se chamar arquivo, manda arquivo
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html/' + req.params[0]));
});

app.listen(porta, (err) => {
    console.log('[Site GEELLI] Servidor ouvindo porta ' + porta);
});

// Passport é o módulo que cuida da parte de autorizar ou não o usuário a acessar as páginas
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);