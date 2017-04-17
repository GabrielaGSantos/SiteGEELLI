// Este arquivo será usado no futuro(... Se tudo der certo) para desenvolver uma engine completa de inscricoes

const mysql = require('mysql');
const model = require('../modelos/model');
const database = require('../config/database');
const bcrypt = require('bcryptjs');
const table = 'inscricoes';

// create a stdout console logger
const log = require('simple-node-logger').createSimpleLogger('../siteGEELLI.log');

// Assume que todas as tabelas possuem um campo do tipo id com auto increment
var Inscricao = module.exports = model(table, ['eventoId',
    'usuarioId',
    'modalidade',
    'enviouTrabalho',
    'pathTrabalho',
    'status'
]);