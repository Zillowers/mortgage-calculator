const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
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

mortgageDataSchema.plugin(autoIncrement.plugin, {
  model: 'Mortgages',
  field: 'id',
  startAt: 10000001,
  incrementBy: 1,
});

mortgageDataSchema.index({ id: 1, street: 1 });
const Mortgages = mongoose.model('Mortgages', mortgageDataSchema);

module.exports = {
  Mortgages,
};
