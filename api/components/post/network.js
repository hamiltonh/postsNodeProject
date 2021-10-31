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

// functions
function list(req, res, next) {
    controller.list()
        .then((data)=>{
            response.success(req, res, 200, data)
        })
        .catch(next)
}

function get(req, res, next){
    
    controller.get(( req.params.id ))
       .then((user) => {
            response.success(req, res, 200, user)
       })
       .catch(next)
    //    .catch((err) => {
    //         response.success(req, res, 500, error.message)
    //    });
}

async function upsert(req, res, next){
    try {
        const user = await controller.upsert( req.body, req.params.id )
        response.success(req, res, 201, user)
        // console.log('affectedRows:', user.affectedRows)
    } 
    catch(error) {
        // response.success(req, res, 500, error.message)
        next(error)
    }
}

async function remove(req, res, next){

    try {
        const user = await controller.remove( req.params.id )
        response.success(req, res, 200, user)
        console.log('affectedRows:', user.affectedRows)
    } 
    catch(error) {
        // response.success(req, res, 500, error.message)
        next(error)
    }
}

module.exports = router