const logger = require('../logger');

class AnotherHandler {
  get config() {
    return {
      type: 'com.mk.messages.simple',
    };
  }

  async do(data) {
    logger.info('I\'m AnotherHandler. I\'ve got a message!', data);
    return;
  }
}

module.exports = AnotherHandler;
