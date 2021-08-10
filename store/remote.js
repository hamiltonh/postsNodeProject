const request = require('request')

function createRemoteDB(host, port) {
    const URL = 'http://'+ host + ':' + port
    // todo
    function req(method, table, data){

    }

    function list(table) {
        return req('GET', table)
    }

    // function get (table, id)
    // function upsert (table, data)
    // function query (table, query, join)

}