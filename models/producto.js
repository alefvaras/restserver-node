const {Schema,model, SchemaType, SchemaTypes}= require('mongoose')

const ProductoSchema=Schema({

    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio'],
        unique:true
    },
    estado:{
        type:String,
        default:true,
        required:true
    },
    
    usuario:{
        type:SchemaTypes.ObjectId,
        ref:'Usuario',
        required:true
    
    },
    precio:{
        type : Number,
        default:0
    },
    
    categorias:{
        type:SchemaTypes.ObjectId,
        ref:'Categorias',
        required:true
    },
    descripcion: {
        type : String,
    },
    disponible:{
        type : Boolean,
        default:true
    }
})

ProductoSchema.methods.toJSON= function(){
    const {__v,stado,...data} = this.toObject();
    
    return data;
}


module.exports=model('Producto',ProductoSchema)