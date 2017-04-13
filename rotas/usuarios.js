const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../modelos/usuario');
const database = require('../config/database');
const path = require('path');

router.post('/registrar', (req, res, next) => {
    console.log('POST REQUEST FROM ' + req.body.email + ' ON URL /register');

    let new_user = new User(database, {
        nome: req.body.nome,
        nascimento: req.body.nascimento,
        rg: req.body.rg,
        cpf: req.body.cpf,
        estado: req.body.estado,
        cidade: req.body.cidade,
        instituicao: req.body.instituicao,
        formacao: req.body.formacao,
        email: req.body.email,
        senha: req.body.senha
    });

    var sql = 'SELECT * FROM usuarios WHERE email = ' + database.escape(new_user.email);
    console.log('[DATABASE REQUEST] ' + sql);
    database.query(sql, function(error, results, fields) {
        if (error) throw error;
        if (results[0]) {
            console.log('ERROR TO REGISTER ' + req.body.email);
            return res.status(500).type('json').send({ success: false, error: true });
        }
        else User.addUser(new_user, () => {
            console.log('SUCCESFULLY REGISTERED ' + req.body.email);
            return res.status(200).type('json').send({ success: true });
        });
    });
});

router.post('/alterar', (req, res, next) => {
    console.log('POST REQUEST FROM ' + req.body.oldEmail + ' ON URL /getUser');
    let new_user = new User(database, {
        nome: req.body.nome,
        nascimento: req.body.nascimento,
        rg: req.body.rg,
        cpf: req.body.cpf,
        estado: req.body.estado,
        cidade: req.body.cidade,
        instituicao: req.body.instituicao,
        formacao: req.body.formacao,
        email: req.body.oldEmail,
        senha: req.body.senha
    });

    const email = req.body.oldEmail;
    const senha = req.body.senha;

    var sql = "SELECT * FROM usuarios WHERE email = '" + email + "'";
    console.log('[DATABASE REQUEST] ' + sql);
    database.query(sql, function (error, results, fields) {
        if (error) throw error;
        if (!results[0]) {
            console.log('ERROR TO CHANGE ' + req.body.oldEmail + ' INFORMATIONS');
            return res.status(500).type('json').send({ success: false, error: true, msg: 'Sua sess�o expirou. Fa�a login e tente novamente.' });
        }
        User.compararSenhas(senha, results[0].senha, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                User.changeUser(new_user, () => {
                    console.log('SUCCESFULLY ALTERED ' + req.body.oldEmail + 'INFORMATIONS');
                    return res.status(200).type('json').send({ success: true });
                });
            } else {
                console.log('ERROR TO CHANGE ' + req.body.oldEmail + ' INFORMATIONS');
                return res.status(500).type('json').send({ success: false, error: true, msg: 'Senha inv�lida. N�o foi poss�vel concluir sua solicita��o' });
            }
        });
    });
});

// Profile
router.get('/getUser', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('GET REQUEST FROM ' + req.user[0].email + ' ON URL /getUser');
    return res.json(req.user[0] );
});

// Authenticate
router.post('/autenticar', (req, res, next) => {
    'POST REQUEST FROM ' + req.body.email + ' ON URL /authenticate'
    const email = req.body.email;
    const senha = req.body.senha;

    var sql = "SELECT * FROM usuarios WHERE email = '" + email + "'";
    console.log('[DATABASE REQUEST] ' + sql);
    database.query(sql, function(error, results, fields) {
        if (error) throw error;
        if (!results[0]) {
            console.log('ERROR ON AUTHENTICATE ' + req.body.email);
            return res.status(500).type('json').send({ success: false, error: true });
        }
        User.compararSenhas(senha, results[0].senha, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(results[0], database.senha, {
                    expiresIn: 604800 // 1 week
                });
                console.log(req.body.email + ' LOGGED IN SUCCESSFULLY');
                return res.status(200).type('json').send({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: results[0].id,
                        nome: results[0].nome,
                        email: results[0].email
                    }
                });
            } else {
                console.log('ERROR TO AUTHENTICATE ' + req.body.email);
                return res.status(500).type('json').send({ success: false, error: true });
            }
        });
    });
});

router.get('/meusDados', (req, res) => {
    res.sendFile(path.join(__dirname, '../public_html/meusDados.html'));
});

router.get('/meusEventos', (req, res) => {
    res.sendFile(path.join(__dirname, '../public_html/meusEventos.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public_html/login.html'));
});

router.get('/inscricao', (req, res) => {
    res.sendFile(path.join(__dirname, '../public_html/inscricao.html'));
});

router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../public_html/cadastro.html'));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public_html/' + req.params[0]));
});

module.exports = router;
