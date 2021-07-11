const { nanoid }  = require('nanoid')
const user = require('../api/components/user')

const db = {
    user:[
        {name:'hamilton', id:1},
        {name:'nicolas', id:2},
    ]
}

// Convertimos en fn asincrona con async, y a quien recible ajustamos con then, catch
async function list(tabla){
    return db[tabla]
}

async function get(tabla, id){
    const reg = await list(tabla)
    return reg.filter( item => item.id === id)[0] || null
}

async function upsert(tabla, element){

    // update - PUT
    if (element.id){

        const index = db[tabla].findIndex(el=> el.id === element.id )       
        if(index !== -1){
            db[tabla][index] = element
        } else {
            throw new Error ('Error: Element does not exist!')
        }
    // insert
    } else{
        element.id = nanoid(5)
        db[tabla].push(element)
        console.table(db)
        
        return element
    }
}

async function remove(tabla, id){
   
    const index = db[tabla].findIndex( el => el.id === parseInt(id) )
    if(index != -1){
        return db[tabla].splice(index, 1)
    } else{
        return {}
    }
}

module.exports = {
    list,
    get,
    remove,
    upsert,
}