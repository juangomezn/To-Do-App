const express = require('express')
const cors = require('cors')

const app = express()

//Middlewares Globales
app.use(cors())
app.use(express.json())

//Rutas
app.get('/', (req, res) => {
    res.send('API To-Do Funcionando')
})

module.exports = app