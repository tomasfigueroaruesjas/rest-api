const express = require('express')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios';

        this.middlewares(); // LOS MIDDLEWARES DEBEN LLAMARSE ANTES DE LAS RUTAS
        this.routes();
    }

    middlewares() {
        // habilitar uso de json para poder leer el body de una request
        this.app.use(express.json());

        // carpeta publica
        this.app.use(express.static("public"))
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server online', this.port)
        })
    }
}

// export default Server; Ñoro ya no sirve en backend vvvv

module.exports = Server