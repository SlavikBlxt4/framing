// src/services/clientService.js
const Client = require('../models/photographerModel');

exports.createPhotographer = (data) => {
  return new Promise((resolve, reject) => {
    Client.create(data, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

exports.loginPhotographer = (data) => {
  return new Promise((resolve, reject) => {
    Client.login(data, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

exports.getAllPhotographers = () => {
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
