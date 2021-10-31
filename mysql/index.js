// Este es un ejemplo de un microservicio privado con MYSQL
const express = require('express')
const app = express()
app.use(express.json())

const config = require('../config')
const router = require('./network')

// Routes
app.use('/', router)

app.listen(config.mySqlService.port, () => {
    console.log('Connected SQL port::',config.mySqlService.port );
})