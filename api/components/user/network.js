const express = require('express')
const router = express.Router() //No es necesario, pero por especifidad router por optimizacion.
const response = require('../../../network/response')
const controller = require('./index')

// Routes
router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.put('/:id', upsert)
router.delete('/:id', remove)

function list(req, res){
    
    controller.list()
       .then((lista) => {
            response.success(req, res, 200, lista)
       }).catch((err) => {
            response.success(req, res, 500, error.message)
       });
}

function get(req, res){
    
    controller.get(( req.params.id ))
       .then((user) => {
            response.success(req, res, 200, user)
       }).catch((err) => {
            response.success(req, res, 500, error.message)
       });
}

async function upsert(req, res){

    try {
        const user = await controller.upsert( req.body, req.params.id )
        response.success(req, res, 201, user)
    } catch(error) {
        response.success(req, res, 500, error.message)
    }
}

async function remove(req, res){

    try {
        const user = await controller.remove( req.params.id )
        response.success(req, res, 200, user)
    } catch(error) {
        response.success(req, res, 500, error.message)
    }
}

module.exports = router
