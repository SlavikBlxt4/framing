// src/models/clientModel.js
const db = require('../db');

const Client = {
  create: (data, callback) => {
    const query = 'INSERT INTO CLIENT (name, last_name, email, password, phone_number) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [data.name, data.last_name, data.email, data.password, data.phone_number], callback);
  },

  login: (data, callback) => {
    const query = 'SELECT * FROM CLIENT WHERE email = ? AND password = ?';
    db.query(query, [data.email, data.password], callback);
  },

  delete: (id, callback) => {
    const query = 'UPDATE CLIENT SET active = 0 WHERE id = ?'; //problema con la variable
    db.query(query, [id], callback);
  },

  findAll: (callback) => {
    const query = 'SELECT * FROM CLIENT';
    db.query(query, callback);
  },

  // Otros métodos como encontrar por ID, actualizar, eliminar, etc.
};

module.exports = Client;
