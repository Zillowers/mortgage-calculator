const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;

const mortgageDataSchema = new mongoose.Schema({
  id: Number,
  street: String,
  home_price: Number,
  property_tax: Number,
  home_insurance: Number,
  hoa_dues: Number,
});

mortgageDataSchema.index({ id: 1, street: 1 });
const Mortgage = mongoose.model('mortgage', mortgageDataSchema);

Mortgage.create();

// mongoimport --db mortgage --collection mortgage --type tsv --file idStreetPriceData.tsv --fields id,street,home_price,property_tax,home_insurance,hoa_dues