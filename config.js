module.exports = {
    api : {
        port: process.env.PORT || 3000
    },
    jwt:{
        secret: process.env.JWT_SECRET || 'super-secret'
    },
    mysql:{
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 'kvSXg2ZlUs',
        password: process.env.MYSQL_PASSWORD || 'R5YXC33fRw',
        database: process.env.MYSQL_DATABASE || 'kvSXg2ZlUs',
        port: process.env.MYSQL_PORT || 3306,
    },
    mySqlService:{
        port: process.env.MYSQL_SERVICE_PORT || 3001,
    }
}

/*
Username: kvSXg2ZlUs

Database name: kvSXg2ZlUs

Password: R5YXC33fRw

Server: remotemysql.com

Port: 3306
*/ 