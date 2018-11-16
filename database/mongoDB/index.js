const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/mortgage';

const db = mongoose.connect(mongoUri);

module.exports = db;
