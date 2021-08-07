const express = require('express')
const user = require('./components/user/network')
const auth = require('./components/auth/network')

const config = require('./config')
const api = express()
const PATH_BASE = '/api/user'
const PATH_AUTH = '/api/auth'
api.use(express.json())

api.use(PATH_BASE, user)
api.use(PATH_AUTH, auth)

// app.use(express.urlencoded({ extended: true })) //For vars in url

api.listen(config.api.port, function(){
    console.log('Connected in: ', config.api.port, '- Path: ', PATH_BASE)
})


