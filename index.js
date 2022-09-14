const express = require('express');
const path = require('path');
require('dotenv').config();

// App de express
const app = express();

// DB Config
require('./database/config').dbConnection();

// Lectura y parse del body
app.use(express.json());

// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');

// Path público
const publicPath = path.resolve(__dirname, 'public');

// Mis Rutas
app.use('/api/login', require('./routes/auth') );
app.use('/api/usuarios', require('./routes/usuarios'));

app.use(express.static(publicPath))

server.listen(process.env.PORT, (err) =>{
    if(err) throw new Error(err);
    console.log(`Servidor Corriendo en puerto ${process.env.PORT}`);
});
