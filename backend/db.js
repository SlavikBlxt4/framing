// src/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',  // Cambia esto según tu configuración
  user: 'root', // Cambia esto según tu configuración
  password: 'Contraseña1234#', // Cambia esto según tu configuración
  database: 'framing', // Cambia esto según tu configuración

  //configuracion unicamente de la base de datos local, cambiar en cada caso
  //pendientes de crear una en aws
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos como id ' + connection.threadId);
});
    
module.exports = connection;
