const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth_controllers')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.post('/login',[
    check('email', 'ingrese un correo valido').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
] , login);

module.exports = router;