const mongoose = require('mongoose');
const { Mortgages } = require('./MortgageDB.js');

Mortgages
  .create([{}])
  .then(() => mongoose.connection.close());

// mongoimport --db zillower --collection mortgages --type tsv --file idStreetPriceData.tsv --fields id,street,home_price,property_tax,home_insurance,hoa_dues
