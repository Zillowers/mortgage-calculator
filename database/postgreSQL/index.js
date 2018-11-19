const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  database: 'zillower',
});

connection.connect();

module.exports = connection;
