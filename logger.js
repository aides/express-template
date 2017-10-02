const config = require('config');
const logger = require('pino')(config.get('logging.pino'));

module.exports = logger;

