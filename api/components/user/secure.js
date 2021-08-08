const auth = require('../../../auth')

module.exports = function checkAuth (action){

    function middleware (req, res, next) {
        switch (action){
            case 'update':
                const ownerId = req.params.id //req.body.id
                auth.check.own(req, ownerId) 
                next() //Continuar procesando la fn donde se encuentra el middlware
                break
                
            default:
                next()
        }
    }
    return middleware
}