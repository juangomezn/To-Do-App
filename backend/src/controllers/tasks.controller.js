const Task = require('../models/task.model')

module.exports = {
    //Obtener tareas de Usuario
    async getTasks(req, res) {
        try {
            const userId = req.user.id
            const tasks = await Task.getTasksByUser(userId)

            res.json(tasks)
        }   catch (error) {

            console.error('Error en getTasks;', error)
            res.status(500).json( { message: 'Error interno del servidor'} )

        }
    },

    //Crear tarea
    async createTask(req, res) {
        try {
            const userId = req.user.id
            const { title, description } = req.body

            if (!title) {
                return res.status(400).json({message: 'El titulo es Obligatorio'})
            }

            const taskId = await Task.createTask(userId, title, description || null)

            res.status(201).json({
                message: 'Tarea creada correctamente',
                taskId
            })

        }   catch (error) {

            console.error('Error en createTask:', error)
            res.status(500).json({message: 'Error internmo del servidor'})

        }
    },

    //Actualizar Tarea
    async updateTask(req, res){
        try{
            const userId =  req.user.id
            const taskId = req.params.id

            const fields = req.body

            //Verifica si la tarea pertenece al usuario
            const Task = await Task.getTasksById(taskId, userId)

            if(!task) {
                return res.status(404).json({ message: 'Tarea no encontrada o no te pertenece'})
            }

            const updated = await Task.updateTask(taskId, userId, fields)

            if(!updated) {
                return res.status(400).json({ message: 'No se pudo actualizar la tarea' })
            }

            res.json({ message: 'Tarea actualizada correctamente' })

        }   catch(error) {

            console.error('Error en updateTask:', error)
            res.status(500).json({ message: 'Error interno del servidor' })

        }
    },

    //Eliminar Tarea
    async deleteTask(req, res){
        try{

            const userId = req.user.id
            const taskId = req.params.id

            //Verifica si la tarea le pertenece
            const Task = await Task.getTasksById(taskId, userId)
            if(!task){
                return res.status(404).json({ message: 'Tarea no encontrada o no te pertence'})
            }

            const deleted = await Task.deleteTask(taskId, userId)

            if (!deleted) {
                return res.status(400).json({ message: 'No se pudo eliminar la tarea'})
            }

            res.json({ message: 'Trea eliminada corerctamente' })

        }   catch (error) {

            console.error('Error en deleteTask:', error)
            res.status(500).json({ message: 'Error interno del servidor' })

        }

    }

}