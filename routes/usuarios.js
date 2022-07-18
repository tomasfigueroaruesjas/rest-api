const { Router } = require("express");
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
} = require("../controllers/usuarios_controllers")
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { esRoleValido, esEmailValido, usuarioExistePorId } = require('../helpers/db-validators')


const router = new Router();

router.get('/', usuariosGet)
router.post('/', [
    check('nombre', 'el nombre esta vacio').notEmpty(),
    check('email', 'El correo no sirve').isEmail(),
    check('password', 'La contraseña debe tener como mínimo 6 caracteres').isLength({min: 6}),
    // check('role', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(esRoleValido),
    check('email').custom(esEmailValido),
    validarCampos
], usuariosPost)

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(usuarioExistePorId),
    check('role').custom(esRoleValido),
    validarCampos
], usuariosPut)

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(usuarioExistePorId),
    validarCampos
], usuariosDelete)

module.exports = router;