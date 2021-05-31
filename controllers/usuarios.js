const { response } = require("express");
const Usuario = require("../models/usuario");

const obtenerUsuarios = async (req, res = response) => {

    const paginacion = Number(req.query.paginacion) || 0 ;

    const usuarios = await Usuario
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(paginacion)
        .limit(20);

    return res.json({
        ok: true,
        usuarios
    });
}


module.exports = {
    obtenerUsuarios
}