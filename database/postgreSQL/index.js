const { Client } = require('pg');

const connectionString = 'postgres://localhost:5432/zillower';

const client = new Client(connectionString);
client.connect();

const retrieve = (id, callback) => {
  const sql = `SELECT * FROM mortgage where id=${id}`;
  client.query(sql, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data.rows);
    }
  });
};

module.exports = {
  retrieve,
};
