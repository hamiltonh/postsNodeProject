const mysql = require('mysql')
const config = require('../config')

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

//Connection
let connection
function handleCon() {
    connection = mysql.createConnection(dbconf)

    connection.connect(function(err) {

        if(err) {
            console.error('[db error]', err)
            setTimeout(handleCon, 2000)
        } else {
            console.log('[db connected]')
        }
    })

    connection.on('error', function(err) {
        console.error('[db error]', err)
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon()
        } else {
            throw err
        }
    })
}
handleCon()

function list(table) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function get(table, id) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = '${id}' LIMIT 1`, (err, rst) => {
            if (err) return reject(err)
            else resolve(rst);
        })
    })
}

async function upsert(table, payload) {
    /*
    With ON DUPLICATE KEY UPDATE, the affected-rows value per row is:
     1 if the row is inserted as a new row,
     2 if an existing row is updated, and 0 if an existing row is set to its current values
    */ 
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [payload, payload], (error, rst) => {
            console.log(`result upsert table:[${table}], affectedRows:`, rst.affectedRows, payload);
            if (error) {
                return reject(error)
            }
            else resolve(rst)
        })
    })
}

// Solucion SIN PROBAR para construir el upsert. Crear Insert y update independientes. Establecer la logica en el upsert.
/*
function insert(table, data) {
    return new Promise((resolve, reject) => {
        console.log(`INSERT INTO ${table} SET ?`, data)
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

async function upsert(table, data) {
    const result = await get(table,data.id);
    if(result.length <1 ) {
        return insert(table, data);
    } else {
        return update(table, data);
    }
}
*/


function remove(table, id) {
    return new Promise( (resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE id = '${id}' LIMIT 1`, (err, rst) => {
            if (err) return reject(err)
            else resolve(rst)
        })
    })
}

function query(table, query, join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if (err) return reject(err)
            resolve(res[0] || null)
        })
    })
}

function following(table, id) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE user_to = '${id}'`, (err, rst) => {
            if (err) return reject(err)
            else resolve(rst);
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query,
    remove,
    following,
}