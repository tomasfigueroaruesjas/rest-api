const { request, response } = require('express')
const Blog = require('../models/blog');

// Traer posts visibles
const blogGet = async (req, res, next) => {
    const { limite = 5, desde = 0 } = req.query;

    const blogs = await Blog.find({hidden: false})
    .limit(limite)
    .skip(desde)
    .populate('author', 'nombre email')

    const total = await Blog.countDocuments({hidden: false})

    res.status(200).json({
        total,
        blogs
    })

}

// Traer blog por id
const blogGetById = async (req, res, next) => {
    const { id } = req.params

    const blog = await Blog.findById(id).populate('author', 'nombre email')

    if(blog.hidden) return res.status(400).json({
        msg: 'No se encuentra el blog'
    })

    res.status(200).json({
        blog
    })
}

// Crear post
const blogPost = async (req, res, next) => {
    const {title, body} = req.body;

    const blog = new Blog({
        title,
        body,
        author: req.usuario._id
    })

    await blog.save()

    res.json({
        blog
    })
}

// Actualizar
const blogPut = async (req, res, next) => {
    const { id } = req.params;
    const { title, body } = req.body
    const data = {
        title,
        body
    }

    const blogActualizado = await Blog.findByIdAndUpdate(id, data, {new: true})

    res.json({
        msg: 'Blog actualizado correctamente',
        blogActualizado
    })

}

// Borrar
const blogDelete = async (req, res, next) => {
    const { id } = req.params;
    
    const blogBorrado = await Blog.findByIdAndUpdate(id, {hidden: true}, {new: true})

    res.json({
        msg: 'Blog borrado',
        blogBorrado
    })
}

module.exports = {
    blogGet,
    blogPost,
    blogGetById,
    blogPut,
    blogDelete
}