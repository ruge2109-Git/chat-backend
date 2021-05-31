/*
    path: api/usuarios
*/
const { Router } = require("express");
const { obtenerUsuarios } = require("../controllers/usuarios");
const { validarToken } = require("../middlewares/validar-token");

const router = Router();

router.get('/', validarToken, obtenerUsuarios);



module.exports = router;