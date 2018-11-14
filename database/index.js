const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'student',
  database: 'zillower',
});

connection.connect();

module.exports = connection;
