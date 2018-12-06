const mongoose = require('mongoose');
const { dbKey } = require('./dbKey.js');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 20, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

const mongoUri = `mongodb://${dbKey}@db2.htlin.io:27017,db3.htlin.io:27017,db4.htlin.io:27017/zillower?replicaSet=rs0&readPreference=secondaryPreferred`;
const db = mongoose.connect(mongoUri, options);

module.exports = db;
