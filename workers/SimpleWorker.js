const logger = require('../logger');

module.exports = async (job) => {
  logger.info('started job!!!', job);

  for(let i = 0; i < 20000000; i++) {
    Math.sin(i);
  }

  logger.info('finished job!!!');
};
