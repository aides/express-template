const logger = require('../logger');
const cacheService = require('../serviceLoader')('CacheService');

class SimpleAction {
  get route() {
    return {
      verb: 'get',
      path: '/simple',
    };
  }

  async do(req) {
    const value = cacheService.getValue(() => {
      let x = 0;

      for (let i = 0; i < 10000000; i++) {
        x += Math.sin(i);
      }

      return x;
    });

    return {
      myValue: value,
    };
  }
}

module.exports = SimpleAction;
