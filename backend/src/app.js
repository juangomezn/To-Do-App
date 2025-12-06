const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)

const taskRoutes = require('./routes/tasks.routes')
app.use('/tasks', taskRoutes)

app.get('/', (req, res) => {
    res.send('API To-Do Funcionando')
})

module.exports = app                                                             