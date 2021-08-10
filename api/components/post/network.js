const express = require('express')
const router = express.Router() //No es necesario, pero por especifidad router por optimizacion.
const response = require('../../../network/response')
const controller = require('./index')

// Routes
router.get('/', list)

// functions
function list(req, res, next) {
    controller.list()
        .then((data)=>{
            response.success(req, res, 200, data)
        })
        .catch(next)
}
module.exports = router