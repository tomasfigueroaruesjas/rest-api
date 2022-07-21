const express = require('express')
const cors = require('cors') // Libreria para evitar problema de CORS

const { dbConnection } = require('../database/config')


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.blogsPath = '/api/blogs'

        this.connectDb();

        this.middlewares(); // LOS MIDDLEWARES DEBEN LLAMARSE ANTES DE LAS RUTAS
        this.routes();
    }

    async connectDb() {
        await dbConnection()
    }

    middlewares() {
        // habilitar uso de json para poder leer el body de una request
        this.app.use(express.json());

        this.app.use(cors()) // Cors es un middleware

        // carpeta publica
        this.app.use(express.static("public"))
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.blogsPath, require('../routes/blogs'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server online', this.port)
        })
    }
}

// export default Server; Ñoro ya no sirve en backend vvvv

module.exports = Server