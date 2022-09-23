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



module.exports={
    isRolevalidate,
    emailExist,
    idExist
}