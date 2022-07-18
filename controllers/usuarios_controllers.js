const { request, resolve } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')

const usuariosGet = async (req=request, res) => { 
    // No puedo dejar que entre todo lo que manden en la query. SQL Injection
    const { limite=5, desde=0 } = req.query;
    // const usuarios = await Usuario.find({status: true})
    // .skip(desde)
    // .limit(limite)

    // const total = await Usuario.countDocuments({status: true})

    // Peticiones simultaneas. Optimizacion de tiempos de peticiones
    const [usuarios, total] = await Promise.all([
        Usuario.find({status: true})
        .skip(desde)
        .limit(limite),
        Usuario.countDocuments({status: true})
    ])

    res.json({
        limite,
        desde,
        total,
        usuarios
    })
}

const usuariosPost = async (req=request, res) => {
    const {nombre, email, password, role} = req.body;
    const usuario = new Usuario({nombre, email, password, role});

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.status(201).json({
        // msg: 'Peticion POST - Controller',
        usuario
    })
}

const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, email, ...resto } = req.body;

    if(password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        msg: 'Usuario Actualizado',
        usuario
    })
}

const usuariosDelete = async (req, res) => {
    const { id } = req.params;

    // Inhabilitar usuario
    const query = { status: false }
    const usuarioBorrado = await Usuario.findByIdAndUpdate(id, query, { new: true });

    // Borrando fisicamente el registro. No es buena practica
    // const usuarioBorrado = await Usuario.findByIdAndDelete(id);

    res.json({
        msg: 'Borradisimo rey',
        usuarioBorrado
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}