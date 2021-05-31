const { Router } = require("express");
const { obtenerChat } = require("../controllers/mensajes");
const { validarToken } = require("../middlewares/validar-token");
const router = Router();

router.get('/:de', validarToken, obtenerChat);


module.exports = router;
