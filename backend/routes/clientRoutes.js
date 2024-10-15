// src/routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Ruta para crear un cliente
router.post('/register', clientController.createClient);

// Ruta para iniciar sesión de un cliente
router.post('/login', clientController.loginClient);

// Ruta para listar clientes
router.get('/', clientController.listClients);

// Otros métodos...

module.exports = router;
