// src/routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const photographerController = require('../controllers/photographerController');

// Ruta para crear un cliente
router.post('/register', photographerController.createPhotographer);

// Ruta para iniciar sesión de un cliente
router.post('/login', photographerController.loginPhotographer);

// Ruta para listar clientes
router.get('/', photographerController.listPhotographers);

// Otros métodos...

module.exports = router;
