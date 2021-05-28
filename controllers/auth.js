const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/Jwt");

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado'
        });
    }
}

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const usuarioBD = await Usuario.findOne({ email });
        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no está registrado'
            });
        }

        //validar Password
        const validarEmail = bcrypt.compareSync(password, usuarioBD.password);
        if (!validarEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no coincide'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuarioBD.id);
        res.json({
            ok: true,
            usuario: usuarioBD,
            token
        });

    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error inesperado'
        });
    }
}

const renovarToken = async (req, res = response) => {
    try {

        const uid = req.uid;
        const nuevoToken = await generarJWT(uid);
        const usuario = await Usuario.findById(uid); 

        return res.json({
            ok:true,
            usuario,
            token:nuevoToken
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error inesperado'
        });
    }
}

module.exports = {
    crearUsuario,
    login,
    renovarToken
}