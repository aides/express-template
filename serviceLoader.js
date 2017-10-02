const glob = require('glob');
const path = require('path');
const logger = require('./logger');

const files = glob.sync(path.join(__dirname, 'services/**/*Service.js'));

const services = {};

for (const f of files) {
  const service = new (require(f))();
  logger.info(`Loaded ${service.constructor.name}`);

  services[service.constructor.name] = service;
}

module.exports = (name) => {
  return services[name];
};
