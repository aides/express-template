const config = require('config');
const rabbit = require('rabbot');

const connection = rabbit.addConnection(config.get('queue'));

module.exports = {
  connection: connection,
  rabbit: rabbit,
};
