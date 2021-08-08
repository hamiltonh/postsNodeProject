const  response = require('./response')

function errors(err, req, res, next) {
 
    console.log('[error]', err)
    const message = err.message || 'Internal error!'
    const statusCode = err.statusCode || 500

    response.error(req, res, statusCode, message)
}

module.exports = errors