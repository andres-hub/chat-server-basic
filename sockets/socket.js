const {io} = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuasrioConectado, usuasrioDesconectado } = require('../controllers/socket');


// Mensajes de sockets
io.on('connection', (client) => {

    console.log('Cliente conectado');
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    
    if(!valido) {return client.disconnect()}

    console.log('Cliente autenticado');
    usuasrioConectado(uid)

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
        usuasrioDesconectado(uid);
     });
     
});