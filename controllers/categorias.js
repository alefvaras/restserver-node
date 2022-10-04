const { response, request } = require("express");
const { Categoria } = require("../models");



//obtener categorias , paginado total-populate
//obtener categorias , populate
//actualizar categorias , recibe y actualiza nombre
//borrar categoria, estado a false

const categoriaoGet = async (req = request, res = response) => {

    const { desde = 0 } = req.query;

    //  const usuarios= await usuario.find({estado:true}).
    //  skip(Number(desde)).
    //  limit(Number(limit));

    //  const total= await usuario.countDocuments({estado:true});

    const [total, categoria] = await Promise.all([
        Categoria.countDocuments({ estado: true }),
        Categoria.find({ estado: true }).
            skip(Number(desde))
            .populate('usuario','nombre')
    ])
    res.status(200)

        .json({
            total,
            categoria,
            
        });
}

const obtenerCategoria=async(req=request,res=response)=>{
    const{id} =req.params;

    const categoria= await Categoria.findById(id).populate('usuario','nombre');
return res.json(categoria);
}
const crearCategoria= async(req,res=response)=>{

    const nombre= req.body.nombre.toUpperCase();

    const categoriaDb=await Categoria.findOne({nombre});

    if(categoriaDb) return res.status(400).json({msg:`la categoria ${categoriaDb.nombre} ya existe`})

    const data={
        nombre,
        usuario:req.usuario._id
    }

    const categoria= new Categoria(data);

    await categoria.save();


    res.status(201).json(categoria);
}

const actualizarCategoria = async(req=request,resp=response)=>{
    const {id}= req.params;
    const {estado,usuario,...data}= req.body;
    data.nombre= data.nombre.toUpperCase();
    data.usuario=req.usuario._id;

    const categoria= await Categoria.findByIdAndUpdate(id,data,{new:true});

    resp.json(categoria);



}

const borrarCategoria = async(req=request,resp=response)=>{
    const {id}= req.params;


    const categoria= await Categoria.findByIdAndUpdate(id,{estado:false},{new:true});

    resp.json(categoria);


}

module.exports={
    crearCategoria,
    categoriaoGet,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}