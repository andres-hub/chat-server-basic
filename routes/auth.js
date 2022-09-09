/*
    path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const {crearUsuario, login, renewTokn} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', [
    check('emial', 'El emial no es valido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('emial', 'El emial no es valido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario);

router.get('/renew', validarJWT, renewTokn);

module.exports = router;