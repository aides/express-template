const valueService = require('../serviceLoader')('ValueService');

class GetCacheAction {
  get route() {
    return {
      verb: 'get',
      path: '/cache',
    };
  }

  async do(req) {
    const value = await valueService.getValue();

    return {
      myValue: value,
    };
  }
}

module.exports = GetCacheAction;
