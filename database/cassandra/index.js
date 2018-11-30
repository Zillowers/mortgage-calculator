const cassandra = require('cassandra-driver');

// const db = new cassandra.Client({ contactPoints: ['172.31.3.36'], keyspace: 'datahaus' });
const db = new cassandra.Client({ contactPoints: ['localhost'], keyspace: 'zillower' });

module.exports = db;
