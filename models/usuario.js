const { Schema, model } = require("mongoose")

const UsuarioSchema = Schema({
    nombre: {   
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role: {
        type: String,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    img: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Usuario', UsuarioSchema)