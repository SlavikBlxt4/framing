// src/controllers/clientController.js
const clientService = require('../services/clientService');

exports.createClient = async (req, res) => {
  try {
    const nuevaReserva = await clientService.createClient(req.body);
    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginClient = async (req, res) => {
  try {
    const loginReserva = await clientService.loginClient(req.body);
    res.status(200).json(loginReserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listClients = async (req, res) => {
  try {
    const clients = await clientService.getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Otros métodos...
