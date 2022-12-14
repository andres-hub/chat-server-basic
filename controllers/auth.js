const {response} = require('express');
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario');
const {generarJwt} = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        const existsEmail = await Usuario.findOne({ email });
        
        if(existsEmail) {
            return res.status(400).json({
                ok: false,
                msg: "el correo y esta registrado"
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();

        const token = await generarJwt(usuario.uid);
    
        res.json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const login = async (req, res = response) =>{
    
    const {email, password} = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if(!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Emial no encontrado"
            });
        }
        
        // validar password
        vilidPassword = await bcrypt.compareSync(password, usuario.password);
        if(!vilidPassword){
            return res.status(400).json({
                ok: false,
                msg: "La contraseña no es valida"
            });
        }
        
        const token = await generarJwt(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const renewTokn = async (req, res = response) => {

    const { uid } = req;
    console.log(uid)
    try {

        const token = await generarJwt(uid);

        const usuario = await Usuario.findById(uid);
    
        res.json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });        
    }
   
}

module.exports = {
    crearUsuario,
    login,
    renewTokn
}