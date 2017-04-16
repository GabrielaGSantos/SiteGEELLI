const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../modelos/usuario');
const database = require('../config/database');
const path = require('path');

// create a stdout console logger
const log = require('simple-node-logger').createSimpleLogger('../siteGEELLI.log');

router.post('/registrar', (req, res, next) => {
    log.info('[ACCESS LOG] POST REQUEST FROM ' + req.connection + 'WITH EMAIL' + req.body.email + ' ON URL /usuarios/registrar');

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
    log.info('[DATABASE REQUEST] ' + sql);
    database.query(sql, function(error, results, fields) {
        if (error) throw error;
        if (results[0]) {
            log.info('[ACCESS LOG] ERROR TO REGISTER ' + req.body.email);
            return res.status(500).type('json').send({ success: false, error: true });
        } else User.addUser(new_user, () => {
            log.info('[ACCESS LOG] SUCCESFULLY REGISTERED ' + req.body.email);
            return res.status(200).type('json').send({ success: true });
        });
    });
});

router.post('/alterar', (req, res, next) => {
    log.info('[ACCESS LOG] POST REQUEST FROM ' + req.connection.remoteAddress + 'WITH EMAIL' + req.body.oldEmail + ' ON URL /usuarios/alterar');
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
    log.info('[DATABASE REQUEST] ' + sql);
    database.query(sql, function(error, results, fields) {
        if (error) throw error;
        if (!results[0]) {
            log.info('[ACCESS LOG] ERROR TO CHANGE ' + req.body.oldEmail + ' INFORMATIONS');
            return res.status(500).type('json').send({ success: false, error: true, msg: 'Sua sess�o expirou. Fa�a login e tente novamente.' });
        }
        User.compararSenhas(senha, results[0].senha, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                User.changeUser(new_user, () => {
                    log.info('[ACCESS LOG] SUCCESFULLY ALTERED ' + req.body.oldEmail + 'INFORMATIONS');
                    return res.status(200).type('json').send({ success: true });
                });
            } else {
                log.info('[ACCESS LOG] ERROR TO CHANGE ' + req.body.oldEmail + ' INFORMATIONS');
                return res.status(500).type('json').send({ success: false, error: true, msg: 'Senha inv�lida. N�o foi poss�vel concluir sua solicita��o' });
            }
        });
    });
});

// Profile
router.get('/getUser', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.user[0].email + ' ON URL /getUser');
    return res.json(req.user[0]);
});

// Authenticate
router.post('/autenticar', (req, res, next) => {
    '[ACCESS LOG] POST REQUEST FROM ' + req.connection.remoteAddress + 'WITH EMAIL' + req.body.email + ' ON URL /usuarios/authenticate'
    const email = req.body.email;
    const senha = req.body.senha;

    var sql = "SELECT * FROM usuarios WHERE email = '" + email + "'";
    log.info('[DATABASE REQUEST] ' + sql);
    database.query(sql, function(error, results, fields) {
        if (error) throw error;
        if (!results[0]) {
            log.info('[ACCESS LOG] ERROR ON AUTHENTICATE ' + req.body.email);
            return res.status(500).type('json').send({ success: false, error: true });
        }
        User.compararSenhas(senha, results[0].senha, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(results[0], database.senha, {
                    expiresIn: 604800 // 1 week
                });
                log.info('[ACCESS LOG] ' + req.body.email + ' LOGGED IN SUCCESSFULLY');
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
                log.info('[ACCESS LOG] ERROR TO AUTHENTICATE ' + req.body.email);
                return res.status(500).type('json').send({ success: false, error: true });
            }
        });
    });
});

router.get('/meusDados', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /usuarios/meusDados');
    res.sendFile(path.join(__dirname, '../public_html/meusDados.html'));
});

router.get('/meusEventos', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /usuarios/meusEventos');
    res.sendFile(path.join(__dirname, '../public_html/meusEventos.html'));
});

router.get('/login', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /usuarios/login');
    res.sendFile(path.join(__dirname, '../public_html/login.html'));
});

router.get('/cadastro', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /usuarios/cadastro');
    res.sendFile(path.join(__dirname, '../public_html/cadastro.html'));
});

router.get('*', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /usuarios' + req.params[0]);
    res.sendFile(path.join(__dirname, '../public_html/' + req.params[0]));
});

module.exports = router;