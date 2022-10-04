const {Schema,model, SchemaType, SchemaTypes}= require('mongoose')

const CategoriaSchema=Schema({

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
})

CategoriaSchema.methods.toJSON= function(){
    const {__v,stado,...data} = this.toObject();

  
    
    return data;
}

module.exports=model('Categorias',CategoriaSchema)