const express = require('express')
const user = require('./components/user/network')
const config = require('./config')
const api = express()

// api.use('/api/user', (req, res)=>{
//     res.send('Hola!')
// })

api.use('/api/user', user)

api.listen(config.api.port, function(){
    console.log('Conectado en: ', config.api.port);
})


