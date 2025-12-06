const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
    verifyToken: (req, res, next) => {

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {

            return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado' })
        }

        try {

            const decoded = jwt.verify(token, JWT_SECRET)
            req.user = decoded
            next()
        } catch (err) {
            console.error('Error de verificación JWT:', err.message);
            return res.status(403).json({ message: 'Token no valido o expiro' })
        }
    }
}