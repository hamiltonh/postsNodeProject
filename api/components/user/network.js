const express = require('express')
const router = express.Router()
const response = require('../../../network/response')
const controller = require('./controller')

router.get('/', (req, res)=>{
    
    // res.send('Ruta GET ok!')
    const list = controller.list()
    response.success(req, res, 200, list)

})

module.exports = router
