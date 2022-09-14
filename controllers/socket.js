const Usuario = require('../models/usuario');

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

module.exports = {
    usuasrioConectado,
    usuasrioDesconectado
}