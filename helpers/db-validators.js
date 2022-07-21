const Role = require('../models/role')
const Usuario = require('../models/usuario')
const Blog = require('../helpers/generar-jwt')

const esRoleValido = async (role = "") => {
    const existeRole = await Role.findOne({
        role
    })
    if (!existeRole) throw new Error(`El rol ${role} no existe en la database`)
}

const esEmailValido = async (email) => {
    const validarEmail = await Usuario.findOne({
        email
    }) // Por que se busca en el schema? Como llega a la base de datos?
    if (validarEmail && validarEmail != '') throw new Error(`El email ${email} ya esta en uso`)
}

const usuarioExistePorId = async (id) => {
    const validarId = await Usuario.findOne({
        _id: id
    }) // Por que se busca en el schema? Como llega a la base de datos?
    if (!validarId) throw new Error(`El id ${id} no existe`)
}

const existeBlogById = async (id) => {
    const existeBlog = await Blog.findById({
        _id: id
    })

    if (!validarId) throw new Error(`El id ${id} no existe`)
}

module.exports = {
    esRoleValido,
    esEmailValido,
    usuarioExistePorId,
    existeBlogById
}