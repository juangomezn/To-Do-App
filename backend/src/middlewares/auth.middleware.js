const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if(!token){
            return res.status(401).json({message: 'Acceso denegado. Token no proporcionado'})
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            next()
        }   catch (err) {
            return res.status(403).json({ message: 'Token no valido o expiro'})
        }
    }
}