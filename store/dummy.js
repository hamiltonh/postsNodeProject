const user = require('../api/components/user')

const db = {
    user:[
        {name:'hamilton', id:'1'},
        {name:'nicolas', id:'2'},
    ]
}

// Convertimos en fn asincrona con async, y a quien recible ajustamos con then, catch
async function list(tabla){
    return db[tabla] || []
}

async function get(tabla, id){
    const reg = await list(tabla)
    return reg.filter( item => item.id === id)[0] || null
}

async function upsert(tabla, element){

    if(!db[tabla]){
        db[tabla]=[]
    }

    if (element.id){

        const index = db[tabla].findIndex(el=> el.id === element.id )    
        
        // update - PUT
        if(index !== -1){
            db[tabla][index] = element
        
        // insert - POST
        } else {
            db[tabla].push(element)
        }
    
    } else{
        throw new Error ('Error: id not valid!')
    }

    console.log(db[tabla])
    return element
}

async function remove(tabla, id){
   
    const index = db[tabla].findIndex( el => el.id === (id) )
    if(index != -1){
        return db[tabla].splice(index, 1)
    } else{
        return {}
    }
}
 
async function query (tabla, q){
    let col = await list(tabla)
    let keys = Object.keys(q)
    let key = keys[0]
    // console.log(key)//username

    return col.filter(item => item[key] === q[key]) [0] || null
}

module.exports = {
    list,
    get,
    remove,
    upsert,
    query,
}