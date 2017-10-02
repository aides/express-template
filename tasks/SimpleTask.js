const logger = require('../logger');

class SimpleTask {
  get cron() {
    return '0 * * * * *';
  }

  async tick() {
    // count tick executions
    logger.info(`${this.constructor.name} Executed! It executes every minute`);
  }
}

module.exports = SimpleTask;
