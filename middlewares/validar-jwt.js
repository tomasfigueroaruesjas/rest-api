const {
    request
} = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJWT = async (req = request, res, next) => {
    const token = req.header('x-token')

    // verificar que llego el token
    if (!token) return res.status(401).json({
        msg: 'No se reconoce el token'
    })

    try {
        // verificar el token / leer al usuario
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

        // verificar si el usuario existe
        const usuario = await Usuario.findById(uid)
        if(!usuario) return res.status(401).json({
            msg: 'Token no valido'
        })

        // verificar si el usuario esta activo
        if(!usuario.status) return res.status(401).json({
            msg: 'Token no valido'
        })

        // guardar la info de usuario en una nueva propiedad 'usuario' en la request
        req.usuario = usuario;

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token not valid'
        })
    }

}

module.exports = {
    validarJWT
}