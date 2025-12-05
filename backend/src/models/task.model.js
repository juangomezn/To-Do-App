const db = require('../config/db.js')

const Task = {
    //Crear Tarea
    async createTask(userId, title, description) {
        const [result] = await db.query(
            'INSERT INTO tasks (userId, title, description) VALUES (?, ?, ?)',
            [userId, title, description]
        )
        return result.insertId
    },

    //Obtener tarea del Usuario
    async getTasksByUser(userId) {
        const [rows] = await db.query(
            'SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt DESC',
            [userId]
        )
        return rows
    },

    // Obtener una tarea por id y usuario (validación)
    async getTaskById(id, userId) {
        const [rows] = await db.query(
            'SELECT * FROM tasks WHERE id = ? AND userId = ?',
            [id, userId]
        )
        return rows
    },

    // Actualizar tarea
    async updateTask(id, userId, fields) {

        if (!fields || Object.keys(fields).length === 0) {
        throw new Error('No fields provided for update.');
    }

        let query = 'UPDATE tasks SET ';
        const values = []

        if(fields.title){
            query += 'title = ?, ';
            values.push(fields.title)
        }

        if(fields.description !== undefined) {
            query += 'description = ?, ';
            values.push(fields.description)
        }

        if(fields.status) {
            query += 'status = ?, ';
            values.push(fields.status)
        } 

        query = query.slice(0, -2)
        query += 'WHERE id = ? AND userId = ?'

        values.push(id, userId)

        const [result] = await db.query(query, values)
        return result.affectedRows > 0

    }, 

    //Eliminar tarea
    async deleteTask(id, userId) {
        const [result] = await db.query(
            'DELETE FROM tasks WHERE id = ? AND userId = ?',
            [id, userId]
        )
        return result.affectedRows > 0
    }
}

module.exports = Task