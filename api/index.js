const express = require('express')
const config = require('../config')
const user = require('./components/user/network')
const auth = require('./components/auth/network')
const post = require('./components/post/network')

const errors = require('../network/errors')

const api = express()
api.use(express.json())
// app.use(express.urlencoded({ extended: true })) //For vars in url

const PATH_BASE = '/api/user'
const PATH_AUTH = '/api/auth'
api.use(PATH_BASE, user)
api.use(PATH_AUTH, auth)
api.use('/api/post', post)

//Important: Custom error handling as a middleware using next(). For unexpected errors used in [user/network.js]
api.use(errors)

api.listen(config.api.port, ()=>{
    console.clear()
    console.log('Connected in: ', config.api.port, '- Path: ', PATH_BASE)
})

