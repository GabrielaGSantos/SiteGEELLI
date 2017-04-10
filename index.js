// Importando as dependências
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const passport = require('passport');
const database = require('./config/database');

// Definindo a porta 
const porta = process.env.port || 8080;

// Chamando algumas funções importantes
app.use(cors());

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

// Tentando conectar no banco de dados
database.connect((err) => {
    if (err) console.log ('Não foi possível se conectar ao banco de dados');
});

// Configurando o servidor estático
app.use(express.static(path.join(__dirname, 'Site')));

// Configurando rotas básicas
// Quando chamar a página principal, enviar index.html
app.get('/', (req, res) => { 
    res.sendfile(path.join(__dirname, 'Site/index.html'));
});

const usuarios = require('./rotas/usuarios');
app.use('/usuarios', usuarios);

// Quando chamar qualquer outra página, envia a outra página
app.get('*', (req, res) => { 
    res.sendFile(path.join(__dirname, 'Site/' + req.params[0]));
});

app.listen(porta, (err) => {
    console.log('Servidor ouvindo porta ' + 8080);
});

// Passport é o módulo que cuida da parte de autorizar ou não o usuário a acessar as páginas
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

