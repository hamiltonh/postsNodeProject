const bcrypt = require('bcrypt')

const auth = require('../../../auth')
const TABLA = 'auth'

// La idea es utilizar la capa de store para todos los componentes, o permitir especificar uno
module.exports = function(injectedStore){
    
    let store = injectedStore || require('../../../store/dummy')

    async function login(username, password){
        const data = await store.query(TABLA, { username })
        // console.log('Data::::',data)
        return bcrypt.compare(password, data.password)//Compare fn return boolean
                .then( isValid =>{
                    if(isValid){
                        delete data.password //DO not include the password int the payload
                        // Gen token
                        return auth.signToken(data) 
                    }
                    else
                        throw new Error('Invalid information!')
                })
    }

    async function upsert(data){

        const saltRounds = 5     
        const authData = {
            id: data.id,
        }

        if(data.username){  
            authData.username = data.username
        }
        if(data.password){  
            authData.password = await bcrypt.hash(data.password, saltRounds)//data.password
        }   

        return store.upsert(TABLA, authData)
    }    

    return  {
        upsert,
        login,
    }
}