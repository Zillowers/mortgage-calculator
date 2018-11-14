const mysql = require('mysql');
const config = require('../dataconfig.js');

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

connection.connect();

module.exports = connection;
