var mysql = require('mysql');

const connection = mysql.createConnection({
    host: '177.52.245.161',
    user: 'cliente_s',
    password: 'T?JVFu=fc35@',
    database: 'dbemp00250'
});

module.exports = connection;