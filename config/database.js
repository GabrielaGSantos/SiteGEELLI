const mysql = require('mysql');

const senha = '123456';

module.exports = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: senha,
   database: 'teste'
});

module.exports.senha = senha;