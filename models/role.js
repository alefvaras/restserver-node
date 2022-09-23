const {Schema,model}= require('mongoose')

const RolesSchema=Schema({

role:{
    type:String,
    required:[true,'El rol es obligatorio']
}
})

module.exports=model('Roles',RolesSchema)