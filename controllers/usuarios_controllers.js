const { request, resolve } = require('express')

const usuariosGet = (req=request, res) => { 
    const query = req.query;

    res.json({
        msg: 'Peticion GET - Controller',
        query: query
    })
}

const usuariosPost = (req=request, res) => {
    const body = req.body;
    console.log(body);

    res.json({
        msg: 'Peticion POST - Controller',
        usuario: body
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