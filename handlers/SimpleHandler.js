const logger = require('../logger');

class SimpleHandler {
  get config() {
    return {
      type: 'com.mk.messages.simple',
    };
  }

  async do(data) {
    logger.info('Got a message in SimpleHandler!', data);
    return;
  }
}

module.exports = SimpleHandler;
