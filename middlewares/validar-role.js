const esAdminRole = (req, res, next) => {
    if(!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere validar el rol sin validar el token'
        })
    }

    const {role, nombre} = req.usuario

    if(role !== 'ADMIN_ROLE') {
        return res(401).json({
            msg: `${nombre} no es un usuario administrador`
        })
    }

    next()
}

module.exports = {
    esAdminRole
}