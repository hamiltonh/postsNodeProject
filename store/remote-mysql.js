// Este store para el microservicio es llamado desde components/user/index.js, por lo que 
// el controlador de user llama directamente las funciones de remote.js
const remote = require('./remote')
const config = require('../config')

module.exports = new remote(config.mysqlService.host, config.mysqlService.port)