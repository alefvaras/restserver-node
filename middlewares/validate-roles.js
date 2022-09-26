const { response } = require("express")

const isAdminRol=(req,res=response,next)=>{


    if(!req.usuario) return res.status(500).json({msg:'falta token'})

    const {rol,nombre} =req.usuario;

    if(rol!=='ADMIN_ROLE') return res.status(403).json({msg:'rol no corresponde'})
    next();
    
}
const tieneRol=(...roles)=>{

    return (req,res=response,next)=>{



        if(!roles.includes(req.usuario.rol)) return res.status(403).json({msg:'rol no corresponde'})
        next();
    }
}

module.exports={
    isAdminRol,
    tieneRol
}