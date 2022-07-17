const { Router } = require("express");
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
} = require("../controllers/usuarios_controllers")
const { check } = require('express-validator')

const router = new Router();

router.get('/', usuariosGet)
router.post('/', [
    check('email', 'El correo no sirve').isEmail(),
    check('nombre', 'el nombre esta vacio').notEmpty()
], usuariosPost)
router.put('/:id', usuariosPut)
router.delete('/:id', usuariosDelete)

module.exports = router;