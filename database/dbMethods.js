const db = require('./index.js');

const retrieve = (id, callback) => {
  const sql = `SELECT * FROM mortgage where id=${id}`;
  db.query(sql, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

module.exports = {
  retrieve,
};
