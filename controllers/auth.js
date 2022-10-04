const { response, request, json } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/usuario");
const { generateJWT } = require("../helpers/generateJWT");
const { verify } = require("../helpers/google-verify");

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

const googleSignIn = async (req = request, resp = response) => {

    const { id_token } = req.body;

    try {
        const { nombre, img, correo } = await verify(id_token);
        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: 'kj',
                img,
                google: true


            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        if(!usuario.estado) resp.status(401).json({msg:'usuario bloquiado'})
        const token = await generateJWT(usuario.id);
        resp.json({
            usuario,
            token
        })
    } catch (error) {
        return json.status(400).json({
            ok: false,
            msg: 'token no se pudo verificar'
        })
    }

    resp.json({
        id_token
    })
}

module.exports = {
    login,
    googleSignIn
}

