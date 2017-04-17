const mysql = require('mysql');
const model = require('../modelos/model');
const database = require('../config/database');
const bcrypt = require('bcryptjs');
const table = 'mensagens';

// create a stdout console logger
const log = require('simple-node-logger').createSimpleLogger('../siteGEELLI.log');

// Assume que todas as tabelas possuem um campo do tipo id com auto increment
var Mensagem = module.exports = model(table, ['nome',
    'email',
    'mensagem'
]);