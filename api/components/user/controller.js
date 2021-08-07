// const store = require('../../../store/dummy')
const { nanoid }  = require('nanoid')
const auth = require ('../auth')
const TABLA = 'user'

// La idea es utilizar la capa de store para todos los componentes, o permitir especificar uno
module.exports = function(injectedStore){
    
    let store = injectedStore || require('../../../store/dummy')

    function list(){
        return store.list(TABLA)
    }
    
    function get(id){
        return store.get(TABLA, id)
    }

    async function upsert(body, id){

        const user = {
            id: id  || nanoid(5),
            name: body.name,
        }

        if(body.password  || body.username){
            await auth.upsert({
                id:user.id,
                username: body.username,
                password: body.password,
            })
        }

        return store.upsert(TABLA, user)
    }

    function remove(id){
        // console.log(id)
        return store.remove(TABLA, id)
    }

    return {
        list,
        get,
        upsert,
        remove,
    }
}


// Lo exporta como un obj:
// module.exports = {
//     list,
// }