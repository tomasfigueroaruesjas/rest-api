const {
    request,
    resolve
} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario')

const { generarJWT } = require('../helpers/generar-jwt')

const login = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        // verificar si existe el email
        const usuario = Usuario.findOne({email})
        if(!usuario) return res.status(400).json({
            msg: 'Email/Password incorrecto'
        })

        // verificar estado del usuario
        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario Suspendido'
            })
        }

        // encriptar contraseña
        const salt = bcryptjs.genSaltSync()
        usuario.password = hashSync(password, salt)

        // verificar contraseña
        const validarPassword = bcryptjs.compareSync(password, )
        if (!validarPassword) return res.status(400).json({
            msg: 'Email/Password es incorrecto' // No especifico por cuestion de seguridad
        })


        // generar token (json web token)
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            email,
            password
        })
    } catch (error) {
        consolge.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el admin'
        })
    }


}

module.exports = {
    login
}