const { request, response } = require("express");

const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)
const { subirArchivo } = require("../helpers/uploads");
const { Usuario, Producto } = require("../models");

const cargarArchivo = async (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({ msg: 'no hay archivo en la peticion' });
    }

    try {
        const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos')
        return res.json({ nombre });
    } catch (error) {
        return res.status(400).json({ msg: error })
    }
    const mostrarImagen = () => {

    }
}
const actualizarImagen = async (req = request, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);

            if (!modelo) return res.status(400).json({ msg: `no existe usuario con el id: ${id}` })
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) return res.status(400).json({ msg: `no existe producto con el id: ${id}` })
            break;


        default:
            return res.status(500).json({ msg: 'no validado' })
            break;
    }
    if (!req.files) return res.status(400).json({ msg: `no existe archivo` })

    //limpiar imagenes previas

    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen)
        }
    }

    modelo.img = await subirArchivo(req.files, undefined, coleccion)

    await modelo.save();

    res.json({ modelo })
}



const actualizarImagenCloudinary = async (req = request, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);

            if (!modelo) return res.status(400).json({ msg: `no existe usuario con el id: ${id}` })
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) return res.status(400).json({ msg: `no existe producto con el id: ${id}` })
            break;


        default:
            return res.status(500).json({ msg: 'no validado' })
            break;
    }
    if (!req.files) return res.status(400).json({ msg: `no existe archivo` })

    //limpiar imagenes previas

    if (modelo.img) {
        const nombreArr = modelo.img.split('/');

        const nombre = nombreArr[nombreArr.length - 1];


        const [public_id] = nombre.split('.');
         cloudinary.uploader.destroy(public_id)
    }


    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
    // modelo.img=await subirArchivo(req.files,undefined,coleccion)
    modelo.img = secure_url;
    await modelo.save();

    res.json({ modelo })
}

const mostrarArchivo = async (req = request, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);

            if (!modelo) return res.status(400).json({ msg: `no existe usuario con el id: ${id}` })
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) return res.status(400).json({ msg: `no existe producto con el id: ${id}` })
            break;


        default:
            return res.status(500).json({ msg: 'no validado' })
            break;
    }
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            res.sendFile(pathImagen)
        }
    }

    res.sendFile(path.join(__dirname, '../assets/', 'no-image.jpg'))

}
module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarArchivo,
    actualizarImagenCloudinary

}