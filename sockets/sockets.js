const { io } = require("..");

// Mensajes de sockets
io.on('connection', client => {
    client.on('disconnect',()=>{
        console.log("Cliente desconectado");
    });
});