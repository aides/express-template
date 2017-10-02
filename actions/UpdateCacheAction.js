const valueService = require('../serviceLoader')('ValueService');

class GetCacheAction {
  get route() {
    return {
      verb: 'post',
      path: '/cache',
    };
  }

  async do(req) {
    const value = await valueService.setValue();

    return { result: 'OK' };
  }
}

module.exports = GetCacheAction;
