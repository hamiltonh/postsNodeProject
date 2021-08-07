const express = require('express')
const router = express.Router() //No es necesario, pero por especifidad router por optimizacion.
const response = require('../../../network/response')
const controller = require('./index')

router.get('/login', (req, res)=>{
    controller.login(req.body.username, req.body.password)
        .then(token => {
            response.success(req, res, 200, token)
        })
        .catch(e => {
            response.error(req, res, 400, 'Invalid information! ', e)
        })
})

module.exports = router

