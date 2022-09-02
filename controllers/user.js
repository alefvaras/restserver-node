
const {response,request} =require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {validationResult}=require('express-validator');
const usuarioGet=(req=request, res =response) => {

    const {nombre='ale2'}=req.query;
    res.status(200)
    
      .json({
            msn: 'get',
           
            nombre:nombre,
            query:req.query
        });
}

const usuarioPost= async(req, res =response) => {

    const errors= validationResult(req);
    if(!errors.isEmpty()) return res.status(100).json({errors})

const {nombre,correo,password,rol}=req.body;
const usuario=new Usuario({nombre,correo,password,rol});

const exiteEmail=await Usuario.findOne({correo});

if(exiteEmail) return res.status(400).json({error:'correo ya esta registrado'})

const salt = bcrypt.genSaltSync();
usuario.password= bcrypt.hashSync(password,salt);


await usuario.save();

    res.status(201)
      .json({
            msn: 'post',
            usuario
        });
}
const usuarioPut=(req, res =response) => {

    const {id}= req.params;
   
    res.status(200)
    
      .json({
            msn: 'put',
            id:id
        });
}

const usuarioDelete=(req, res =response) => {

    const {id}= req.params;
    res.status(200)
    
      .json({
            msn: 'delete'
        });
}

const usuarioPath=(req, res =response) => {
    res.status(200)
    
      .json({
            msn: 'patch'
        });
}



module.exports={
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    usuarioPath
}