const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Mensagem = require('../modelos/mensagem');
const database = require('../config/database');
const path = require('path');
const table = 'mensagens';

// create a stdout console logger
const log = require('simple-node-logger').createSimpleLogger('../siteGEELLI.log');

router.post('/enviarMensagem', (req, res) => {
    log.info('[ACCESS LOG] POST REQUEST FROM ' + req.connection + 'WITH EMAIL' + req.body.email + ' ON URL /mensagens/enviarMensagem');

    let new_mensagem = new Mensagem(database, {
        nome: req.body.nome,
        email: req.body.email,
        mensagem: req.body.mensagem
    });

    sql = 'INSERT INTO ' + table + ' SET ?';
    log.info('[DATABASE REQUEST] ' + sql);
    var query = database.query(sql, new_mensagem, function(error, results, fields) {
        if (error) return res.status(500).type('json').send({ success: false, error: true, msg: error });
        return res.status(200).type('json').send({ success: true, msg: null });
    });
});

module.exports = router;