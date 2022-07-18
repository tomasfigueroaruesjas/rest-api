const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);

    next() // le dice al middleware que continue normalmente en caso de no cumplirse la condicion
}

module.exports = { validarCampos };