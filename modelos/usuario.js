const mysql = require('mysql');
const model = require('node-model.js');
const database = require('../config/database'); 
const bcrypt = require('bcryptjs');
const table = 'usuarios';

// Assume que todas as tabelas possuem um campo do tipo id com auto increment
const User = module.exports = model(table, ['nome', 'email', 'senha']);

module.exports.getUserById = function(user_id, callback) {
    var query =  new User(database, {id: user_id});
    query.get(callback);
}

module.exports.getUserByEmail = function(user_email, callback) {
    var query =  new User(database, {email: user_email});
    query.get(callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.senha, salt, (err, hash) => {
      if(err) throw err;
      newUser.senha = hash;
      newUser.save(callback);
    });
  });
}