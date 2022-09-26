const { response, request } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require("../models/usuario");


const validateJwt = async (req = request, resp = response, next) => {

    const token = req.header('x-token');

    if (!token) return resp.status(401).json({ msg: 'no hay token' });

    try {

        //       const payload=  jwt.verify(token,process.env.SECRET_KEY)
        // console.log(payload)
        const { uid } = jwt.verify(token, process.env.SECRET_KEY)
        req.uid = uid;

        const usuario = await Usuario.findById(uid);

        if (!usuario) return resp.status(401).json({ msg: 'token no valido' });
        if (!usuario.estado) return resp.status(401).json({ msg: 'token no valido' });

        req.usuario = usuario;

    } catch (error) {
        console.log(error)
        return resp.status(401).json({ msg: 'token no valido' });
    }


    next();
}

module.exports = { validateJwt };