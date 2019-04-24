const express = require('express');
const fs = require('fs');
var multer = require('multer')
var storage = multer.diskStorage({
    destination: '../uploaded/resumos/',
    filename: function(req, file, cb) {
        cb(null, Date.now() + req.body.userId + '.' + file.originalname.substr((~-file.originalname.lastIndexOf(".") >>> 0) + 2))
    }
});

var upload = multer({
    storage: storage
})
const app = express();
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../modelos/usuario');
const database = require('../config/database');
const Inscricao = require('../modelos/inscricaoIISelp');
const InscricaoXISarau = require('../modelos/inscricaoXIPoesia')
const InscricaoMinicursoI = require('../modelos/inscricaominicursoi')
const path = require('path');


// create a stdout console logger
const log = require('simple-node-logger').createSimpleLogger('../siteGEELLI.log');

router.post('/iiselp/inscrever', (req, res) => {
    log.info('[ACCESS LOG] POST REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /eventos/iiselp/inscrever');
    let new_inscricao = new Inscricao(database, {
        userId: Number(req.body.userId),
        userName: req.body.userName,
        tipoInscricao: Number(req.body.tipoInscricao),
        enviouTrabalho: Number(req.body.tipoInscricao),
        nomeTrabalho: req.body.nomeTrabalho || 'undefined',
        caminhoLocalTrabalho: 'NULL',
        status: "Inscrito"
    });

    console.log(new_inscricao);
    var sql = 'SELECT * FROM inscricoesiiselp WHERE userId = ' + database.escape(new_inscricao.userId);
    log.info('[DATABASE REQUEST] ' + sql);
    database.query(sql, function(error, results, fields) {
        if (error) throw error;
        if (results[0]) {
            log.info('[ACCESS LOG] ERROR TO SUBSCRIBE ' + req.body.userId);
            return res.status(500).type('json').send({ success: false, error: true });
        } else Inscricao.inscreverUser(new_inscricao, () => {
            log.info('[ACCESS LOG] SUCCESFULLY SUBSCRIBED ' + req.body.userId);
            return res.status(200).type('json').send({ success: true });
        });
    });
});

router.post('/iiselp/uploadResumo', upload.single('resumo'), (req, res) => {
    log.info('[ACCESS LOG] UPLOAD REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /eventos/iiselp/uploadResumo');
    if (req.file) {
        log.info('[SERVER LOG] UPLOADED FILE ' + req.file.originalname + ' AS ' + req.file.path);

        var sql = 'SELECT * FROM inscricoesiiselp WHERE userId = ' + database.escape(req.body.userId);
        log.info('[DATABASE REQUEST] ' + sql);
        database.query(sql, function(error, results, fields) {
            if (error) throw error;
            if (!results[0]) {
                log.info('[ACCESS LOG] ERROR ADD FILE UPLOAD INFORMATION TO ' + req.body.userId);
                return res.status(500).type('json').send({ success: false, error: true });
            } else Inscricao.adicionarArquivo(req.file.path, req.body.userId, () => {
                log.info('[ACCESS LOG] SUCCESFULLY ADDED FILE UPLOAD INFORMATION TO ' + req.body.userId);
                return res.redirect('/usuarios/meusEventos');
            });
        });
    } else {
        log.info('[ACCESS LOG] UPLOAD REQUEST FROM ' + req.connection.remoteAddress + ' FAILED. REASON: No file to upload');
        return res.redirect("javascript:alert(231);");
    }
});

router.get('/iiselp/inscricao', (req, res) => {
    log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /eventos/iiselp/inscricao');
    res.sendFile(path.join(__dirname, '../public_html/inscricaoiiselp.html'));
});

router.post('/iiselp/getInscricao', (req, res) => {
    log.info('[ACCESS LOG] POST REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /eventos/iiselp/getInscricao');
    var sql = 'SELECT * FROM inscricoesiiselp WHERE userId = ' + database.escape(req.body.userId);
    log.info('[DATABASE REQUEST] ' + sql);
    database.query(sql, function(error, results, fields) {
        if (error) throw error;
        if (!results[0]) {
            log.info('[ACCESS LOG] QUERY ERROR: ' + req.body.userId + ' is not subscribed');
            return res.status(200).type('json').send({ success: true, msg: null });
        } else {
            log.info('[ACCESS LOG] QUERY SUCCESSFULL: ' + req.body.userId + ' is subscribed');
            if (results[0].enviouTrabalho[0] == 1 && results[0].caminhoLocalTrabalho == "NULL") {
                results[0].status = "ERRO! Entre em contato com o GEELLI";
                return res.status(200).type('json').send({ success: true, msg: results[0] });
            } else return res.status(200).type('json').send({ success: true, msg: results[0] });
        }
    });
});

router.get('/iiselp/cancelarInscricao', (req, res) => {
    //log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /usuarios/' + req.params[0]);
    Inscricao.cancelarInscricao(Number(req.query.userId), () => {
        return res.redirect('/usuarios/meusEventos?javascript:alert("Inscricao Cancelada");');
    })
});

router.get('/xipoesiapedepassagem/inscricao', (req, res) => {
    //log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /eventos/iiselp/inscricao');
    res.sendFile(path.join(__dirname, '../public_html/inscricaoxisarau.html'));
});

router.get('/minicursoi/inscricao', (req, res) => {
    //log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /eventos/iiselp/inscricao');
    res.sendFile(path.join(__dirname, '../public_html/inscricaominicursoi.html'));
});

router.post('/xipoesiapedepassagem/inscrever', (req, res) => {
    //log.info('[ACCESS LOG] POST REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /eventos/iselp/inscrever');
    let new_inscricao = {
        id_usuario: Number(req.body.userId),
        id_modalidade: Number(req.body.modalidade),
        descricao: req.body.nomeTrabalho
    };
    
    var sql = 'SELECT * FROM inscricaoxisarau WHERE id_usuario = ' + database.escape(new_inscricao.id_usuario);
    log.info('[DATABASE REQUEST] ' + sql);
    database.query(sql, function(error, results, fields) {
        if (error) throw error;
        if (results[0]) {
            log.info('[ACCESS LOG] ERROR TO SUBSCRIBE ' + req.body.userId);
            return res.status(500).type('json').send({ success: false, error: true });
        } else InscricaoXISarau.inscreverUser(new_inscricao, () => {
            log.info('[ACCESS LOG] SUCCESFULLY SUBSCRIBED ' + req.body.userId);
            return res.status(200).type('json').send({ success: true });
        });
    });
});


router.post('/minicursoi/inscrever', (req, res) => {
   // log.info('[ACCESS LOG] POST REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /eventos/iselp/inscrever');
    let new_inscricao = {
        id_usuario: Number(req.body.userId),
        turno: req.body.turno
    };
    
    var sql = 'SELECT * FROM inscricaominicursoi WHERE id_usuario = ' + database.escape(new_inscricao.id_usuario);
    log.info('[DATABASE REQUEST] ' + sql);
    database.query(sql, function(error, results, fields) {
        if (error) throw error;
        if (results[0]) {
            log.info('[ACCESS LOG] ERROR TO SUBSCRIBE ' + req.body.userId);
            return res.status(500).type('json').send({ success: false, error: true });
        } else InscricaoMinicursoI.inscreverUser(new_inscricao, () => {
            log.info('[ACCESS LOG] SUCCESFULLY SUBSCRIBED ' + req.body.userId);
            return res.status(200).type('json').send({ success: true });
        });
    });
});

router.post('/xipoesiapedepassagem/getInscricao', (req, res) => {
    //log.info('[ACCESS LOG] POST REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /eventos/xipoesiapedepassagem/getInscricao');
    var sql = 'SELECT * FROM inscricaoxisarau WHERE id_usuario = ' + database.escape(req.body.userId);
    log.info('[DATABASE REQUEST] ' + sql);
    database.query(sql, function(error, results, fields) {
        if (error) throw error;
        if (!results[0]) {
            log.info('[ACCESS LOG] QUERY ERROR: ' + req.body.userId + ' is not subscribed');
            return res.status(200).type('json').send({ success: true, msg: null });
        } else {
            log.info('[ACCESS LOG] QUERY SUCCESSFULL: ' + req.body.userId + ' is subscribed');
            return res.status(200).type('json').send({ success: true, msg: results[0] });
        }
    });
});

router.post('/minicursoi/getInscricao', (req, res) => {
    //log.info('[ACCESS LOG] POST REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /eventos/minicursoi/getInscricao');
    var sql = 'SELECT * FROM inscricaominicursoi WHERE id_usuario = ' + database.escape(req.body.userId);
    log.info('[DATABASE REQUEST] ' + sql);
    database.query(sql, function(error, results, fields) {
        if (error) throw error;
        if (!results[0]) {
            log.info('[ACCESS LOG] QUERY ERROR: ' + req.body.userId + ' is not subscribed');
            return res.status(200).type('json').send({ success: true, msg: null });
        } else {
            log.info('[ACCESS LOG] QUERY SUCCESSFULL: ' + req.body.userId + ' is subscribed');
            return res.status(200).type('json').send({ success: true, msg: results[0] });
        }
    });
});

router.get('/xipoesiapedepassagem/cancelar', (req, res) => {
    //log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /usuarios/' + req.params[0]);
    InscricaoXISarau.cancelarInscricao(Number(req.query.userId), () => {
        return res.redirect('/usuarios/meusEventos?javascript:alert("Inscricao Cancelada");');
    })
});


router.get('/minicursoi/cancelar', (req, res) => {
    //log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /usuarios/' + req.params[0]);
    InscricaoMinicursoI.cancelarInscricao(Number(req.query.userId), () => {
        return res.redirect('/usuarios/meusEventos?javascript:alert("Inscricao Cancelada");');
    })
});

router.get('/iiselp/*', (req, res) => {
    //log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /usuarios/' + req.params[0]);
    res.sendFile(path.join(__dirname, '../public_html/' + req.params[0]));
});

router.get('/xipoesiapedepassagem/*', (req, res) => {
    //log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /usuarios/' + req.params[0]);
    res.sendFile(path.join(__dirname, '../public_html/' + req.params[0]));
});

router.get('/minicursoi/*', (req, res) => {
    //log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /usuarios/' + req.params[0]);
    res.sendFile(path.join(__dirname, '../public_html/' + req.params[0]));
});



router.get('*', (req, res) => {
    //log.info('[ACCESS LOG] GET REQUEST FROM ' + req.connection.remoteAddress + ' ON URL /usuarios' + req.params[0]);
    res.sendFile(path.join(__dirname, '../public_html/' + req.params[0]));
});


module.exports = router;