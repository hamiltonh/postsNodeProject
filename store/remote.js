const request = require('request')//peticiones http sencillas. Esta deprecado. Se puede utilizar, axios, fetch, etc.

function createRemoteDB(host, port) {

    const URL =  `http://${host}:${port}`

    function list(table) {
        return req('GET', table)
    }

    function get (table, id){
        return req('GET', table, id)
    }

    function insert(table, data) {
        // console.log('-4 remote.js insert', table, data);
		return req('POST', table, data);
	}

	function update(table, data) {
		return req('PUT', table, data);
	}

    function remove(table, data) {
        console.log('remote.js delete', data);
		return req('DELETE', table, data);
	}

    // TODO: Try to avoid make a request to verify if already exists the id
    function upsert (table, data){
        // console.log('-3 remote.js upsert ', table, data);
        if(data.id){
            get(table, data.id)
                .then(resp =>{
                    return resp.length === 0 ? insert(table, data) : update(table, data)
                })
                .catch(err =>{
                    console.log('error:', err);
                    return
                })
        } else {
            return insert(table, data) //Segun el controller, siempre se tendra un ID. ASi que esto no es necesario.
        }
    }

    function query (table, query, join){
        return req('POST', table + '/query', {query, join})
    }

    function req(method, table, data){
        
        let url = URL + '/' + table
        let body = ''

        // TO manage  request sending id as a param, or data for create new entities
        if ( (method === 'GET' || method === 'DELETE') && data) {
			url += '/'+ data;
		} else if (data) {
			body = JSON.stringify(data);
		}

        console.log('-5 remote.js REQ fn', method, url, body)
        return new Promise((resolve, reject)=>{
           
            request ({
                    method, 
                    headers:{ 'content-type': 'application/json'  },
                    url, 
                    body,
            }, (err, req, body)=>{
                
                if(err) {
                    console.log('err:', err)
                    return reject(new Error('Error with database: '+ err?.message))
                }
        
                const resp = JSON.parse(body)
                // console.log('resp::', resp)
                return resolve(resp.body)
            })
        })
    }

    return  {
        list,
        get,
        insert,
        update,
        upsert,
        query,
        remove,
    }
}

module.exports = createRemoteDB