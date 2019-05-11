// Devido a urgência do primeiro evento, criei um banco de dados específico para ele

const mysql = require('mysql');
const model = require('./model');
const database = require('../config/database');
const bcrypt = require('bcryptjs');
const table = 'inscricoesiiselpminicurso';

// create a stdout console logger
const log = require('simple-node-logger').createSimpleLogger('../siteGEELLI.log');

// Assume que todas as tabelas possuem um campo do tipo id com auto increment
var inscricao = module.exports = model(table, [
    'id_usuario',
    'nome_minicurso',
    'enviouTrabalho',
    'nomeTrabalho',
    'caminhoLocalTrabalho'
]);

module.exports.inscreverUser = function(newInscricao, callback) {
    sql = 'INSERT INTO ' + table + ' SET ?';
    log.info('[DATABASE REQUEST] ' + sql);
    var query = database.query(sql, newInscricao, function(error, results, fields) {
        if (error) throw error;
        return callback();
    });
}

module.exports.adicionarArquivo = function(caminhoLocalTrabalho, userId, callback) {
    sql = "UPDATE " + table + " SET caminhoLocalTrabalho='" + caminhoLocalTrabalho + "' WHERE userId=" + userId;
    log.info('[DATABASE REQUEST] ' + sql);
    var query = database.query(sql, function(error, results, fields) {
        if (error) throw error;
        sql = "UPDATE " + table + " SET status='Trabalho enviado' WHERE userId=" + userId;
        log.info('[DATABASE REQUEST] ' + sql);
        var query = database.query(sql, function(error, results, fields) {
            if (error) throw error;
            else return callback();
        });
    });
}

module.exports.cancelarInscricao = function(userId, callback) {
    sql = "DELETE FROM " + table + " WHERE id_usuario=" + userId;
    log.info('[DATABASE REQUEST] ' + sql);
    var query = database.query(sql, function(error, results, fields) {
        if (error) throw error;
        return callback();
    });
}