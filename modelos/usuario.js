const mysql = require('mysql');
const model = require('../modelos/model');
const database = require('../config/database');
const bcrypt = require('bcryptjs');
const table = 'usuarios';

// Assume que todas as tabelas possuem um campo do tipo id com auto increment
var User = module.exports = model(table, ['nome',
    'nascimento',
    'rg',
    'cpf',
    'estado',
    'cidade',
    'instituicao',
    'formacao',
    'email',
    'senha'
]);

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.senha, salt, (err, hash) => {
            if (err) throw err;
            newUser.senha = hash;
            sql = 'INSERT INTO usuarios SET ?';
            console.log('[DATABASE REQUEST] ' + sql);
            var query = database.query('INSERT INTO usuarios SET ?', newUser, function(error, results, fields) {
                if (error) throw error;
                return callback();
            });
        });
    });
}

module.exports.changeUser = function (user, callback) {
    console.log('mundando usuario');
    return callback();
}

module.exports.compararSenhas = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}