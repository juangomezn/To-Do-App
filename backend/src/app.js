const express = require('express')
const cors = require('cors')

const app = express()

//Middlewares Globales
app.use(cors())
app.use(express.json())

//Rutas
const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)

const taskRoutes = require('./routes/tasks.routes')
app.use('/tasks', taskRoutes)

app.get('/', (req, res) => {
    res.send('API To-Do Funcionando')
})

module.exports = app                                                             