const db = {
    user:[
        {name:'hamilton', id:1}
    ]
}

function list(tabla){
    return db[tabla]
}

function get(tabla, id){
    const reg = list(tabla)
    return reg.filter( item => item.id === id)[0] || null
}

function upsert(tabla, data){
    db[tabla].push(data)
    return true
}

function remove(tabla, id){
    return false
}

module.exports = {
    list,
    get,
    remove,
    upsert,
}