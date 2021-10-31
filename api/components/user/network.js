const express = require('express')
const router = express.Router() //No es necesario, pero por especifidad router por optimizacion.
const secure = require('./secure')
const response = require('../../../network/response')
const controller = require('./index')

// Routes
router.get('/', list)
router.get('/:id', get)
router.get('/:id/following', following)
router.post('/', upsert)
router.post('/follow/:id', secure('follow'), follow)
router.put('/:id', secure('update'), upsert)
router.delete('/:id', remove)

function list(req, res, next){
    
    controller.list()
       .then((lista) => {
            response.success(req, res, 200, lista)
       })
       .catch(next)
    //    .catch((err) => {
    //         response.success(req, res, 500, error.message)
    //    });
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
    } 
    catch(error) {
        // response.success(req, res, 500, error.message)
        next()
    }
}

async function remove(req, res, next){

    try {
        const user = await controller.remove( req.params.id )
        response.success(req, res, 200, user)
    } 
    catch(error) {
        // response.success(req, res, 500, error.message)
        next()
    }
}

function follow(req, res, next) {
    console.log('req.user: ',req.user  );
    controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, 201, data);
        })
        .catch(next);
}

function following(req, res, next) {
   
    controller.following(req.params.id)
        .then(data => {
            response.success(req, res, 200, data);
        })
        .catch(next);
}

module.exports = router
