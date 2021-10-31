const { nanoid }  = require('nanoid')

const TABLE = 'post'

module.exports = function(injectedStore){//inyeccion de dependencias
    
    let store = injectedStore || require('../../../store/dummy')
    
    function list(){
        return store.list(TABLE)
    }

    function get(id){
        return store.get(TABLE, id)
    }

    async function upsert(body, id){
        const post = {
            id: id  || nanoid(5),
            text: body.text,
            user_id: body.user_id,
        }
        
        if(post.user_id && post.text){
            return store.upsert(TABLE, post)
        }
        else return Promise.reject(new Error('Error: Bad request!'))
    }

    function remove(id){
        return store.remove(TABLE, id)
    }

    return {
        list,
        get,
        upsert,
        remove,
    }
}
