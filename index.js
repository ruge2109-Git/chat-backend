const express = require('express');
const { dbConnection } = require('./database/config');
const path = require('path');
require('dotenv').config();

//db config
dbConnection();

// Node express
const app = express();

// Lectura y parseo del body
app.use(express.json());

// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/sockets');

// Path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Definición de rutas
app.use('/api/login',require('./routes/auth'));


server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en el puerto!! `, process.env.PORT);
});