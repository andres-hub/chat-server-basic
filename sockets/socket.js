const {io} = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuasrioConectado, usuasrioDesconectado, graberMensaje } = require('../controllers/socket');


// Mensajes de sockets
io.on('connection', (client) => {

    console.log('Cliente conectado');
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    
    if(!valido) {return client.disconnect()}

    console.log('Cliente autenticado');
    usuasrioConectado(uid);

    // Ingresar al usuario a una sala, en particular 
    client.join(uid);

    // Escuchar del cliente mensaje personal
    client.on('mensaje-personal', async (payload)=>{
         await graberMensaje(payload);

        io.to(payload.para).emit('mensaje-personal', payload);

    });


    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
        usuasrioDesconectado(uid);
     });
     
});