const config = require('config');
const pgp = require('pg-promise')({});

const db = pgp(config.get('db'));

module.exports = db;
