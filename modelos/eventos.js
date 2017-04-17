// Este arquivo será usado no futuro(... Se tudo der certo) para desenvolver uma engine completa de inscricoes

const mysql = require('mysql');
const model = require('../modelos/model');
const database = require('../config/database');
const bcrypt = require('bcryptjs');
const table = 'eventos';

// create a stdout console logger
const log = require('simple-node-logger').createSimpleLogger('../siteGEELLI.log');

// Assume que todas as tabelas possuem um campo do tipo id com auto increment
var Evento = module.exports = model(table, ['nome',
    'dataRealizacao',
    'dataInicioInscricoes',
    'dataFinalInscricoes',
    'limiteInscricoes',
    'enviarArtigo'
]);