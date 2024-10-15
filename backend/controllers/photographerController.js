// src/controllers/clientController.js
const clientService = require('../services/photographerService');

exports.createPhotographer = async (req, res) => {
    try {
        const nuevaReserva = await clientService.createPhotographer(req.body);
        res.status(201).json(nuevaReserva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginPhotographer = async (req, res) => {
    try {
        const loginReserva = await clientService.loginPhotographer(req.body);
        res.status(200).json(loginReserva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listPhotographers = async (req, res) => {
    try {
        const clients = await clientService.getAllPhotographers();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};  

// Otros métodos...