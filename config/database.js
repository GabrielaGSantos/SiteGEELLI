// Importa as dependências
const mysql = require('mysql');

// Só altere as configurações do Banco de Dados aqui!
const host = 'localhost';
const user = 'root';
const password = '123456';
const schema = 'geelli';


/* ==== NÃO MEXA DAQUI PARA BAIXO ==== */
// Cria um modelo de conexão ao banco de dados MySQL
module.exports = mysql.createConnection({
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