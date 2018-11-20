const mongoose = require('mongoose');
const { dbKey } = require('./dbKey.js');

const mongoUri = `mongodb://${dbKey}@db.htlin.io:27017/zillower`;
// const mongoUri = 'mongodb://localhost/zillower';
const db = mongoose.connect(mongoUri);

module.exports = db;
