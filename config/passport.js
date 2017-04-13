// Importa as dependências
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../modelos/usuario');
const database = require('../config/database');

// create a stdout console logger
const log = require('simple-node-logger').createSimpleLogger('../siteGEELLI.log');

module.exports = function(passport) {
    let opts = {};

    // Extrai o token da Header
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

    // Usa senha da database como assinatura do Token
    opts.secretOrKey = database.senha;

    // Cria uma estratégia de (des)autenticação
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        // Procura usuário baseado no ID que o token forneceu
        var sql = 'SELECT * FROM usuarios WHERE id = ' + jwt_payload.id;
        log.info('[PASSPORT-JWT] [DATABASE REQUEST] ' + sql);
        database.query(sql, function(error, results, fields) {

            // Caso o usuário esteja OK, retorna OK
            if (error) return done(error, false);
            if (results[0].email) return done(null, results);
            else return done(null, false);
        });
    }));
}