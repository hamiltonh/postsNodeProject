// const store = require('../../../store/dummy')
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

    function upsert(body, id){

        const user = {
            id: parseInt(id),
            name: body.name
        }
        return store.upsert(TABLA, user)
    }

    function remove(id){
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