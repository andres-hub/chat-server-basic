const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuasrioConectado = async ( uid = '' ) => {

    const usuario = await Usuario.findById(uid);
    usuario.online = true;

    await usuario.save();

    return usuario;

}

const usuasrioDesconectado = async ( uid = '' ) => {

    const usuario = await Usuario.findById(uid);
    usuario.online = false;

    await usuario.save();

    return usuario;

}

const graberMensaje = async(payload)=>{

    try {
        const mensaje = Mensaje(payload);
        await mensaje.save();

        return true;
    } catch (error) {
        return false;
    }

}

module.exports = {
    usuasrioConectado,
    usuasrioDesconectado,
    graberMensaje
}