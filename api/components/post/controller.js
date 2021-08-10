const TABLE = 'post'

module.exports = function(injectedStore){
    
    let store = injectedStore || require('../../../store/dummy')
    function list(){
        return store.list(TABLE)
    }

    //todo
    //leer x id
    //añadir
    //editar post

    return {
        list,
    }
}
