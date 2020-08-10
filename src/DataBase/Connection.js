const {databaseInformation} = require('../Utils/SecurityInformation')
var mysql = require('mysql');

const connection = mysql.createConnection(databaseInformation);

module.exports = connection;