const express = require('express')
const router = express.Router() //No es necesario, pero por especifidad router por optimizacion.
const response = require('../network/response')
const Store = require('../store/mysql')

router.get('/:table', list)
router.get('/:table/:id', get)
router.post('/:table', insert)
router.put('/:table', upsert)

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

module.exports = router