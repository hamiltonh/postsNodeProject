// RUTA ENDPOINT SQL COMO SERVICIO http://localhost:3001/user/
const express = require('express')
const router = express.Router() //No es necesario, pero por especifidad router por optimizacion.
const response = require('../network/response')
const Store = require('../store/mysql')

router.get('/:table', list) //ok
router.get('/:table/:id', get) //ok
router.post('/:table', insert) //ok - solo usuario sin incluir clave
router.put('/:table', upsert)
router.post('/:table/query', query)
router.delete('/:table/:id', remove) //ok

async function list(req, res, next){
    
    try {
        const data = await Store.list(req.params.table)
        response.success(req, res, 200, data)
    } catch (error) {
        next(error);
    }
}

async function get(req, res, next){
    try {
        const data = await Store.get(req.params.table, req.params.id)
        response.success(req, res, 200, data)
    } catch (error) {
        next(error);
    }
}

//IMPORTANTE
//Este metodo de creacion de usuario funciona solo enviando en el body: name, username, id.
//No contempla el envio de password y la utilizacion del componente AUTH, como funciona el controller de user.
//Esto fue solo una prueba para validar el SQL como servicio, utilizando su
//propio controlador generico, que en casos como el del user, con clave con hash no lo crea completo por la logica adicional.
async function insert(req, res, next){
    try {
        const data = await Store.upsert(req.params.table, req.body)
        response.success(req, res, 201, data)
    } catch (error) {
        next(error);
    }
}

async function upsert(req, res, next){
    try {
        const data = await Store.upsert(req.params.table, req.body)
        response.success(req, res, 200, data)
    } catch (error) {
        next(error);
    }
}

async function query(req, res, next) {
    const datos = await Store.query(req.params.table, req.body.query, req.body.join)
    response.success(req, res, data, 200);
}

async function remove(req, res, next){
    console.log('remove mysql/network.js ', req.params.id)
    try {
        const data = await Store.remove(req.params.table, req.params.id)
        response.success(req, res, 200, data)
    } catch (error) {
        next(error);
    }
}

module.exports = router