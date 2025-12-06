const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports = {
    async register(req, res){
        try {
            const { name, email, password } = req.body

            if (!name || !email || !password) {
                return res.status(400).json({message:"Todos los campos son obligatorios"})
            }

            if (password.length < 5) {
                return res.status(400).json({message:"La contraseña debe tener al menos 5 caracteres"})
            }

            const existingUser = await User.findUserByEmail(email)
            if(existingUser){
                return res.status(400).json({message:"El email ya esta registrado"})
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const userId = await User.createUser(name, email, hashedPassword)

            return res.status(201).json({
                message: "Usuario registrado correctamente",
                userId
            })

        }   catch (error) {
            console.error("Error en registrar:", error)
            res.status(500).json({message: "Error interno del servidor"})
        }
    },

    async login(req, res) {
        try {

            const { email, password } = req.body

            if(!email || !password) {
                return res.status(400).json({ message: "Email y contraseña son obligatorios"})
            }

            const user = await User.findUserByEmail(email)

            if (!user) {
                return res.status(400).json({ message: "Credenciales incorrectas" })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: "Credenciales incorrectas" })
            }

            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            )

            return res.status(200).json({
                message: "Login exitoso",
                token,
                user:{
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            })

        }   catch (error) {
            console.error("Error en login:", error)
            res.status(500).json({ message: "Error interno del servidor" })
        } 
    }

}