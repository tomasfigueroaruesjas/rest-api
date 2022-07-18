const { request, resolve } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')

const usuariosGet = (req=request, res) => { 
    const query = req.query;

    res.json({
        msg: 'Peticion GET - Controller',
        query: query
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
        msg: 'Peticion PUT - Controller',
        usuario
    })
}

const usuariosDelete = async (req, res) => {
    const { id } = req.params;
    const usuarioBorrado = await Usuario.findByIdAndRemove(id);

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