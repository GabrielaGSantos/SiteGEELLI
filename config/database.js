// Importa as dependências
const mysql = require('mysql');

// Só altere as configurações do Banco de Dados aqui!
const host = '127.0.0.1';
const user = 'root';
//const password = 'gv011216';
const password = 'root';
const schema = 'geelli';


/* ==== NÃO MEXA DAQUI PARA BAIXO ==== */
// Cria um modelo de conexão ao banco de dados MySQL
module.exports = mysql.createPool({
    connectionLimit : 10,
    host: host,
    user: user,
    password: password,
    database: schema
});

// Envia os dados para chamadas externas
module.exports.senha = password;
module.exports.user = user;
module.exports.host = host;
module.exports.schema = schema;
