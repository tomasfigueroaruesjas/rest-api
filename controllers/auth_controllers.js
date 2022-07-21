const {
    request,
    resolve
} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario')

const {
    generarJWT
} = require('../helpers/generar-jwt')

const login = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    
    

    // try {
    //     const usuario = await Usuario.findOne({email})
    //     res.status(200).json({
    //         msg: 'login hecho',
    //         usuario
    //     })
    // } catch (error) {
    //     console.log(error)
    // }

    try {
         // verificar si existe el email
        const usuario = await Usuario.findOne({
            email
        })

        if (!usuario) {
            return res.status(400).json({
                msg: 'Email/Password incorrecto'
            })
        }

        // verificar estado del usuario
        if(!usuario.status) {
            return res.status(400).json({
                msg: 'Usuario Suspendido'
            })
        }

        // encriptar contraseña
        const salt = bcryptjs.genSaltSync()
        usuario.password = bcryptjs.hashSync(password, salt)

        // verificar contraseña
        const validarPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'Email/Password es incorrecto' // No especifico por cuestion de seguridad
            })
        }


        // generar token (json web token)
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Comuniquese con el admin'
        })
    }


}

module.exports = {
    login
}