import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../client/src/components/App.jsx';

const PORT = process.env.PORT || 3000;
require('newrelic');
const db = require('../database/mongoDB');
const { Mortgages } = require('../database/mongoDB/MortgageDB.js');

const app = express();
app.use('/homes/:id', express.static('public/dist'));
app.use('/', express.static('public/dist'));
app.use('/loaderio-032b6383a8e9c0567661e92196f829e0/', express.static('public/loaderio-032b6383a8e9c0567661e92196f829e0.txt'));


app.get('/homes/:id', (req, res) => {
  const { id } = req.params;
  // Mortgages.find({ id }, (err, data) => {
  //   if (err) {
  //     res.end(err);
  //   } else {
  const markup = renderToString(<App />);
  res.send(`
        <!DOCTYPE html>
        <head>
          <meta charset="UTF-8">
          <title>Mortgage Calculator</title>
          <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">
          <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/cssnode">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
          <link rel="stylesheet" href="styles/main.css">
          <script src="bundle.js" defer></script>
        </head>
        <body>
          <div id="app">${markup}</div>
        </body>
        </html>
      `);
  // }
  // });
});

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

app.post('/api/homes/prices', (req, res) => {
  if (!req.body.street) {
    return res.status(400).send('street name required');
  }
  const mortgageSave = new Mortgages(req.body);
  mortgageSave
    .save()
    .then(data => res.status(201).send(data))
    .catch(error => res.status(500).send(error));
});

app.patch('/api/homes/:id/prices', (req, res) => {
  const { id } = req.params;
  Mortgages
    .findOneAndUpdate({ id }, req.body, { new: true })
    .then(data => res.status(200).send(data))
    .catch(error => res.status(500).send(error));
});

app.delete('/api/homes/:id/prices', (req, res) => {
  const { id } = req.params;
  Mortgages
    .deleteOne({ id })
    .then(() => res.status(200).send(`deleted id: ${id}`))
    .catch((error) => {
      res.status(400).send(`id: ${id} does not exist in database\n`, error);
    });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

// const { retrieve } = require('./../database/dbMethods.js'); //MySql
// const { retrieve } = require('../database/postgreSQL'); // postgreSQL
