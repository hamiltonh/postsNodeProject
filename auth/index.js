const jwt = require('jsonwebtoken')
const error = require('../utils/error')
const config = require('../config')
const SECRET = config.jwt.secret

function signToken(data){
    return jwt.sign(data, SECRET)
}

function verify(token) {
    return jwt.verify(token, SECRET)
}

const check = {
    own: function(req, ownerId){
        const decoded = decodeHeader(req)
        console.log(decoded)

        if(decoded.id !== ownerId){
            // throw new Error('You do not have permission for do that!')
            throw error('You do not have permission for do that!', 401 )
        }
    }   
}

function getToken(auth) {
    
    if (!auth) {
        throw new Error('No token!')
    }
    if(auth.indexOf('Bearer') === -1){ //Struct: Authorization: Bearer <token>
        throw new Error('Invalid Format!')
    }

    const token = auth.replace('Bearer ', '')
    return token
}

function decodeHeader(req) {
    try {
        const authorization = req.headers.authorization || ''
        const token = getToken(authorization)
        const decoded = verify(token)
        req.user = decoded

        return decoded
    } catch (err) {
        throw new Error('Error decoding. ', err)
    }
}

module.exports = {
    signToken,
    check,
}