const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const { dbKey } = require('./dbKey.js');

// const mongoUri = `mongodb://${dbKey}@db.htlin.io:27017/zillower`;
const mongoUri = 'mongodb://localhost/zillower';
const db = mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.createConnection(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
autoIncrement.initialize(connection);

module.exports = db;
