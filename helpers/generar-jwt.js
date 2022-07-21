const jwt = require('jsonwebtoken')

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {uid} // como objeto pq uid: uid, la prop tiene el mismo nombre que el value

        jwt.sign(payload, process.env.SECRET_OR_PRIVATE_KEY, {expiresIn: '4h'}, (err, token) => {
            if(err){
                console.log(err)
                reject('No se genero el token')
            } else {
                resolve(token)  
            }
        })
    })
}

module.exports = {
    generarJWT
}