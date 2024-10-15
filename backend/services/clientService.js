// src/services/clientService.js
const Client = require('../models/clientModel');

exports.createClient = (data) => {
  return new Promise((resolve, reject) => {
    Client.create(data, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

exports.loginClient = (data) => {
  return new Promise((resolve, reject) => {
    Client.login(data, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

exports.getAllClients = () => {
  return new Promise((resolve, reject) => {
    Client.findAll((error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

// Otros métodos...
