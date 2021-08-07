const { nanoid } = require('nanoid');
const user = require('../user');

const TABLA = 'auth'
// La idea es utilizar la capa de store para todos los componentes, o permitir especificar uno
module.exports = function(injectedStore){
    
    let store = injectedStore || require('../../../store/dummy')

    function upsert(data){
        
        const authData = {
            id: data.id,
        }

        if(data.username){  
            authData.username = data.username
        }
        if(data.password){  
            authData.password = data.password
        }   

        return store.upsert(TABLA, authData)
    }    

    return  {
        upsert,
    }
};