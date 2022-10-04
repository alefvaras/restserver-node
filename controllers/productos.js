const { response, request } = require("express");
const { Producto } = require("../models");



//obtener categorias , paginado total-populate
//obtener categorias , populate
//actualizar categorias , recibe y actualiza nombre
//borrar categoria, estado a false

const productoGet = async (req = request, res = response) => {

    const { desde = 0 } = req.query;

    //  const usuarios= await usuario.find({estado:true}).
    //  skip(Number(desde)).
    //  limit(Number(limit));

    //  const total= await usuario.countDocuments({estado:true});

    const [total, producto] = await Promise.all([
        Producto.countDocuments({ estado: true }),
        Producto.find({ estado: true }).
            skip(Number(desde))
            .populate('usuario','nombre')
            .populate('categorias','nombre')
        
    ])
    res.status(200)

        .json({
            total,
            producto,
            
        });
}

const obtenerProducto=async(req=request,res=response)=>{
    const{id} =req.params;


    const producto= await Producto.findById(id)   .populate('usuario','nombre')
    .populate('categorias','nombre')
    console.log(producto)

return res.json(producto);
}
const crearProducto= async (req,res=response)=>{

    const nombre= req.body.nombre.toUpperCase();




    const productoaDb=await Producto.findOne({nombre});

    if(productoaDb) return res.status(400).json({msg:`la categoria ${productoaDb.nombre} ya existe`})

    const data={
        nombre,
        usuario:req.usuario._id,
        categorias:req.body.categorias._id
    }

    const producto= new Producto(data);

    await producto.save();


    res.status(201).json(producto);
}

const actualizarProducto = async(req=request,resp=response)=>{
    const {id}= req.params;
    const {estado,usuario,...data}= req.body;
    data.nombre= data.nombre.toUpperCase();
    data.usuario=req.usuario._id;
    data.categoria=req.categoria._id;

    const producto= await Producto.findByIdAndUpdate(id,data,{new:true});

    resp.json(producto);



}

const borrarProducto = async(req=request,resp=response)=>{
    const {id}= req.params;
console.log(id)

    const producto= await Producto.findByIdAndUpdate(id,{estado:false},{new:true});

    resp.json(producto);


}

module.exports={
    productoGet,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}