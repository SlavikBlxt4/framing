// src/app.js
const express = require('express');
const clientRoutes = require('./routes/clientRoutes');
const photographerRoutes = require('./routes/photographerRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/clients', clientRoutes); // Montar las rutas de clientes
app.use('/api/photographers', photographerRoutes); // Montar las rutas de clientes

// Otras rutas...

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});