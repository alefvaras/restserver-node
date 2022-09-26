
const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const usuarioGet = async (req = request, res = response) => {

    const { limit = 5, desde = 0 } = req.query;

    //  const usuarios= await usuario.find({estado:true}).
    //  skip(Number(desde)).
    //  limit(Number(limit));

    //  const total= await usuario.countDocuments({estado:true});

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true }).
            skip(Number(desde)).
            limit(Number(limit))
    ])
    res.status(200)

        .json({
            total,
            usuarios
        });
}

const usuarioPost = async (req, res = response) => {



    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // const exiteEmail=await Usuario.findOne({correo});

    // if(exiteEmail) return res.status(400).json({error:'correo ya esta registrado'})

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);


    await usuario.save();

    res.status(201)
        .json({
            msn: 'post',
            usuario
        });


}
const usuarioPut = async (req, res = response) => {

    const { id } = req.params;

    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);


    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.status(200)

        .json({
            msn: 'put',
            usuario
        });
}

const usuarioDelete = async(req, res = response) => {

    const { id } = req.params;

    const usuarioAuth=req.usuario;
    

    //fisicamente eliminar
    // const usuario= await Usuario.findByIdAndDelete(id);

const usuario = await Usuario.findOneAndUpdate(id,{estado:false})
    res.status(200)
        .json({
            usuario,
            usuarioAuth
        });
}

const usuarioPath = (req, res = response) => {
    res.status(200)

        .json({
            msn: 'patch'
        });
}



module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    usuarioPath
}