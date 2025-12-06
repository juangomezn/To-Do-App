const db = require('../config/db.js');

const User = {

    async createUser(name, email, hashedPassword) {
        const [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        return result.insertId;
    },

    async findUserByEmail(email) {
        const [rows] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    },

    async findUserById(id) {
        const [rows] = await db.query(
            'SELECT id, name, email FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    }
};

module.exports = User;