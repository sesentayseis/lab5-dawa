// Importar las dependencias
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Ruta para el archivo HTML
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// Escuchar la conexión de Socket.IO
io.on('connection', function(socket){
    console.log('Usuario conectado');

    // Escuchar la desconexión del usuario
    socket.on('disconnect', function(){
        console.log('Usuario desconectado');
    });
    // Escuchar el evento 'chat message' para recibir mensajes
    socket.on('chat message', function(msg){
    console.log('Mensaje recibido: ', msg);
    io.emit('chat message', msg);
});

});

// Iniciar el servidor HTTP en el puerto 3000
http.listen(3000, function(){
    console.log('Servidor escuchando en http://localhost:3000');
});

