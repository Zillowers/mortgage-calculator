const db = require('./index.js');
const data = require('./fakeData');

const insert = () => {
  data.forEach((el) => {
    const sql = 'INSERT INTO mortgage(home_price, property_tax, home_insurance, hoa_dues) VALUES(?, ?, ?, ?)';
    db.query(sql, [el.home_price, el.property_tax, el.home_insurance, el.hoa_dues], (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  });
};

insert();
