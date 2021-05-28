/*
    path: api/login
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { crearUsuario ,login, renovarToken} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarToken } = require("../middlewares/validar-token");

const routerAuth = Router();

routerAuth.post('/crearUsuario',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos,
], crearUsuario);

routerAuth.post('/', [
    check('email','El email es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
], login);

routerAuth.get('/renovarToken', validarToken, renovarToken);



module.exports = routerAuth;