const db = require('../config/db.js');

const User = {

    // Crear Usuario
    async createUser(name, email, hashedPassword) {
        const [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        return result.insertId;
    },

    // Buscar usuario por email
    async findUserByEmail(email) {
        const [rows] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]   // ← FALTABA ESTO
        );
        return rows[0];
    },

    // Buscar usuario por ID
    async findUserById(id) {
        const [rows] = await db.query(
            'SELECT id, name, email FROM users WHERE id = ?',
            [id]   // ← FALTABA LA COMA AQUÍ
        );
        return rows[0];
    }
};

module.exports = User;