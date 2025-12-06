const Task = require('../models/task.model');

module.exports = {
    async getTasks(req, res) {
        try {
            const userId = req.user.id;
            const tasks = await Task.getTasksByUser(userId);

            res.json(tasks);
        } catch (error) {
            console.error('Error en getTasks:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    async createTask(req, res) {
        try {
            const userId = req.user.id;
            const { title, description } = req.body;

            if (!title) {
                return res.status(400).json({ message: 'El título es obligatorio' });
            }

            const taskId = await Task.createTask(userId, title, description || null);

            res.status(201).json({
                message: 'Tarea creada correctamente',
                taskId
            });

        } catch (error) {
            console.error('Error en createTask:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    async updateTask(req, res) {
        try {
            const userId = req.user.id;
            const taskId = req.params.id;
            const fields = req.body;

            if (!fields || Object.keys(fields).length === 0) {
                return res.status(400).json({ message: 'Debe proporcionar al menos un campo para actualizar.' });
            }

            const updated = await Task.updateTask(taskId, userId, fields);

            if (!updated) {
                return res.status(404).json({ message: 'Tarea no encontrada o no te pertenece' });
            }

            res.json({ message: 'Tarea actualizada correctamente' });

        } catch (error) {
            console.error('Error en updateTask:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    async deleteTask(req, res) {
        try {
            const userId = req.user.id;
            const taskId = req.params.id;

            const task = await Task.getTaskById(taskId, userId);

            if (!task) {
                return res.status(404).json({ message: 'Tarea no encontrada o no te pertenece' });
            }

            const deleted = await Task.deleteTask(taskId, userId);

            if (!deleted) {
                return res.status(400).json({ message: 'No se pudo eliminar la tarea' });
            }

            res.json({ message: 'Tarea eliminada correctamente' });

        } catch (error) {
            console.error('Error en deleteTask:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

};
