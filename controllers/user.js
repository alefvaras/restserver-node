
const {response,request} =require('express');

const usuarioGet=(req=request, res =response) => {

    const {nombre='ale2'}=req.query;
    res.status(200)
    
      .json({
            msn: 'get',
           
            nombre:nombre,
            query:req.query
        });
}

const usuarioPost=(req, res =response) => {

const {nombre,edad}=req.body;

    res.status(201)
      .json({
            msn: 'post',
            nombre:nombre,
            edad:edad
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