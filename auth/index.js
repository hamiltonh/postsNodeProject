const jwt = require('jsonwebtoken')

function signToken(data){
    return jwt.sign(data, 'secret')//important hide password
}

module.exports = {
    signToken,
}