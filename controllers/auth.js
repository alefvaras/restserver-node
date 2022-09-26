const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/usuario");
const { generateJWT } = require("../helpers/generateJWT");

const login = async (req, resp = response) => {

    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ correo })

        if (!usuario) return resp.status(400).json({ msg: 'usuario/contraseña incorrecto' });

        if (!usuario.estado) return resp.status(400).json({ msg: 'usuario/contraseña incorrecto' });


        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) return resp.status(400).json({ msg: 'usuario/contraseña incorrecto' });


        const token = await generateJWT(usuario.id);
        resp.json({
          usuario,
          token
        })

    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            msg: 'error'
        })
    }

}

module.exports = {
    login
}

