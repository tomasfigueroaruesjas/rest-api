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
    // validar que el email es valido
    const errors = validationResult(req);

    const {nombre, email, password, role} = req.body;
    const usuario = new Usuario({nombre, email, password, role});

    // validar si existe el email
    const validarEmail = await Usuario.findOne({email})
    if (validarEmail) return res.status(400).json({
        msg: 'Ya existe el mail cheeee'
    })

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.status(201).json({
        // msg: 'Peticion POST - Controller',
        usuario
    })
}

const usuariosPut = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'Peticion PUT - Controller',
        userId: id
    })
}

const usuariosDelete = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'Peticion DELETE - Controller',
        userId: id
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}