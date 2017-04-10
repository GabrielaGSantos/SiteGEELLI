const express = require('express');
const app = express();
const router = express.Router();
const User = require('../modelos/usuario');
const database = require('../config/database');

router.post('/registrar', (req, res, next) => {
    let new_user = new User(database, {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.pass
    });

    var sql = 'SELECT * FROM usuarios WHERE email = ' + database.escape(new_user.email);
    database.query(sql, function (error, results, fields) {
        if (error) throw error;
        if (results) return res.json({ sucesso: false, msg: 'Email já cadastrado' });

        else User.addUser(new_user, () => {
            res.json({ sucesso: true, msg: 'Usuario adicionado com sucesso' });
        });
    });

   
});

module.exports = router;