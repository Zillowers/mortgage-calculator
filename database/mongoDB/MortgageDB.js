const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;

const mortgageDataSchema = mongoose.Schema({
  id: Number,
  street: String,
  home_price: Number,
  property_tax: Number,
  home_insurance: Number,
  hoa_dues: Number,
});

mortgageDataSchema.index({ id: 1, street: 1 });
const Mortgages = mongoose.model('Mortgages', mortgageDataSchema);

module.exports = {
  Mortgages,
};
