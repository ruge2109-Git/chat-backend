const Mensaje = require("../models/mensaje")

const obtenerChat = async (req, res) => {
    const idDe = req.uid;
    const mensajeDe = req.params.de;

    const ultimos30Msg = await Mensaje.find({
        $or: [{ de: idDe, para: mensajeDe }, {de:mensajeDe, para:idDe}]
    })
    .sort({createdAt:'desc'})
    .limit(30);

    res.json({
        ok: true,
        mensajes: ultimos30Msg
    });
}

module.exports = {
    obtenerChat
}