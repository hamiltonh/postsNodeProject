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
            username: body.username,
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

    function follow(from, to) {
        return store.upsert(TABLA + '_follow', {
            user_from: from,
            user_to: to,
        });
    }

    // Listar a quien se sigue
    //obs join y query como objeto.
    async function following(id) {
        const join = {}
        join[TABLA] = 'user_to'; // { user: 'user_to' }
        const query = { user_from: id };
		
		return await store.query(TABLA + '_follow', query, join);
	}

    return {
        list,
        get,
        upsert,
        remove,
        follow,
        following,
    }
}


// Lo exporta como un obj:
// module.exports = {
//     list,
// }