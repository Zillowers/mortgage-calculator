const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
// const { retrieve } = require('./../database/dbMethods.js'); //MySql
const { retrieve } = require('../database/postgreSQL'); // postgreSQL
const db = require('../database/mongoDB');
const { Mortgages } = require('../database/mongoDB/mortgageDB.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public/dist'));

app.listen(port, () => {
  console.log(`listening at ${port}`);
});


app.use('/homes/:id', express.static('public/dist'));

// app.get('/api/homes/:id/prices', (req, res) => {
//   const { id } = req.params;
//   retrieve(id, (err, data) => {
//     if (err) {
//       res.end(err);
//     } else {
//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify(data));
//     }
//   });
// });

// MongoDB
app.get('/api/homes/:id/prices', (req, res) => {
  const { id } = req.params;
  Mortgages.find({ id }, (err, data) => {
    if (err) {
      res.end(err);
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    }
  });
});