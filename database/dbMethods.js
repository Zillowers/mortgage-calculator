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

// db.query('SELECT * FROM mortgage', (err, data) => {
//   let arr = [];
//   data.forEach(ele => {
//     if (arr.includes(ele.guid_column)) {
//       console.log(false);
//     }
//     arr.push(ele.guid_column);
//   });
//   console.log(arr)
// });

module.exports = {
  retrieve,
};
