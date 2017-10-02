const bus = require('pubsub-js');
const logger = require('../logger');

// (!) In-process cache
class CacheService {
  constructor() {
    this._subscription = bus.subscribe('value.updated', this.resetCache.bind(this));
    this.value = null;
  }

  resetCache() {
    this.value = null;
    logger.info('Cache has been reset');
  }

  getValue(func) {
    if (!this.value) {
      this.value = func();
    }

    return this.value;
  }
}

module.exports = CacheService;
