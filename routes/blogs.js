const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt')
const { blogGet,  blogPost, blogGetById, blogPut, blogDelete } = require('../controllers/blogs_controllers')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeBlogById } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares/validar-role');

const router = Router();

router.get('/', [validarJWT], blogGet)
router.get('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeBlogById),
    validarCampos
],blogGetById)

router.post('/', [
    validarJWT,
    check('title', 'El titulo es obligatorio').notEmpty(),
    check('body', 'El cuerpo del post es obligatorio').notEmpty(),
    validarCampos
], blogPost)

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeBlogById),
    check('title', 'El titulo es obligatorio').notEmpty(),
    check('body', 'El cuerpo del post es obligatorio').notEmpty(),
    validarCampos
], blogPut)

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeBlogById),
    check('id').custom(esAdminRole),
    validarCampos
], blogDelete)

module.exports = router