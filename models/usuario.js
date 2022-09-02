const { Schema, model } = require("mongoose");


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'Correo obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password obligatorio'],

    },
    img: {
        type: String,

    },
    rol: {
        type: String,
        required: [true, 'Correo obligatorio'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true

    },

    google: {
        type: String,
        default:false
    }

})

module.exports=model('Usuario',UsuarioSchema);