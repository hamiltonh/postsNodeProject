// Este es un ejemplo de un microservicio de datos privado con MYSQL, Ruta http://localhost:3001/user
const express = require('express')
const app = express()
app.use(express.json())

const config = require('../config')
const router = require('./network')

// Routes
app.use('/', router)

app.listen(config.mysqlService.port, () => {
    console.log('Connected SQL port::',config.mysqlService.port );
})