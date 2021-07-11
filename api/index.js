const express = require('express')
const user = require('./components/user/network')
const config = require('./config')
const api = express()
api.use(express.json())

api.use('/api/user', user)
// app.use(express.urlencoded({ extended: true })) //For vars in url

api.listen(config.api.port, function(){
    console.log('Conectado en: ', config.api.port);
})


