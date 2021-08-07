const express = require('express')
const user = require('./components/user/network')
const config = require('./config')
const api = express()
const PATH = '/api/user'
api.use(express.json())

api.use(PATH, user)
// app.use(express.urlencoded({ extended: true })) //For vars in url

api.listen(config.api.port, function(){
    console.log('Connected in: ', config.api.port, '- Path: ', PATH);
})


