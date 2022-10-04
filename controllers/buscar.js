const { request, response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Usuario, Categoria, Producto } = require("../models");



const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino = '', res = response) => {

    const isMongoId = isValidObjectId(termino);



    if (isMongoId) {
        const usuario = await Usuario.findById(termino)

        res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],

        $and: [{ estado: true }]
    }

    );


    res.json({
        results: (usuarios) ? [usuarios] : []
    })
}


const buscarCategorias = async (termino = '', res = response) => {

    const isMongoId = isValidObjectId(termino);



    if (isMongoId) {
        const categoria = await Categoria.findById(termino)

        res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i');
    const categorias = await Categoria.find({
        $or: [{ nombre: regex }],

        $and: [{ estado: true }]
    }

    );


    res.json({
        results: (categorias) ? [categorias] : []
    })
}

const buscarProducto = async (termino = '', res = response) => {

    const isMongoId = isValidObjectId(termino);



    if (isMongoId) {
        const producto = await Producto.findById(termino)

        res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino, 'i');
    const productos = await Producto.find({
       nombre: regex , estado:true
    }

    );


    res.json({
        results: (productos) ? [productos] : []
    })
}

const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) return res.status(400).json({ msg: `las colecciones permitidas son ${coleccionesPermitidas}` })



    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino,res);
            break;
        case 'productos':
            buscarProducto(termino,res);
            break;

        default:
            res.status(500);



    }




}

module.exports = {
    buscar
}