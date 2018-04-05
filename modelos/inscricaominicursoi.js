// Devido a urgência do primeiro evento, criei um banco de dados específico para ele

const mysql = require('mysql');
const model = require('../modelos/model');
const database = require('../config/database');
const bcrypt = require('bcryptjs');
const table = 'inscricaominicursoi';

// create a stdout console logger
const log = require('simple-node-logger').createSimpleLogger('../siteGEELLI.log');

module.exports.inscreverUser = function(newInscricao, callback) {
    sql = 'INSERT INTO ' + table + ' SET ?';
    log.info('[DATABASE REQUEST] ' + sql);
    
    var query = database.query(sql, newInscricao, function(error, results, fields) {
        if (error) throw error;
        return callback();
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