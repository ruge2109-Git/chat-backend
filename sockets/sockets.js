const { io } = require("..");
const { comprobarJWT } = require("../helpers/Jwt");
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de sockets
io.on('connection', client => {
    console.log("Cliente conectado");
    
    //Validar token
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);    
    if (!valido){ return client.disconnect(); } 

    //Actualizar cliente conectado
    usuarioConectado(uid);

    //Sala de chat
    client.join(uid);

    client.on('mensaje-personal', async (payload)=>{
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    })

    client.on('disconnect',()=>{
        usuarioDesconectado(uid);
        console.log("Cliente desconectado");
    });
});