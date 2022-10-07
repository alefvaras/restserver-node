const { Categoria, Producto } = require("../models");
const role = require("../models/role");
const usuario = require("../models/usuario");

const isRolevalidate= async (rol = '') => {

   
    const existRol = await role.findOne({ rol: role });

    if (!existRol) {
        throw new Error('rol no existe')
    }

}

const emailExist= async(correo='')=>{

    const exiteEmail=await usuario.findOne({correo});

    if(exiteEmail)  throw new Error('correo ya esta registrado')
}

const idExist=async(id)=>{
    const exitId=await usuario.findById(id);

    if(!exitId) throw new Error('no existe id')
}


const validateCategory= async(id)=>{
    const exitId=await Categoria.findById(id);

    if(!exitId) throw new Error('no existe id')
}

const validateProducto= async(id)=>{
    const exitId=await Producto.findById(id);

    if(!exitId) throw new Error('no existe id')
}
const validatColeccionesPermitidas=(coleccion='',colecciones=[])=>{
const incluida = colecciones.includes(coleccion);
if(!incluida) throw new Error('la coleccion no esta permitida '+colecciones)

return true;
}
module.exports={
    isRolevalidate,
    emailExist,
    idExist,
    validateCategory,
    validateProducto,
    validatColeccionesPermitidas
}