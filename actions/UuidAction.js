const uuid = require('uuid/v4');

class UuidAction {
  get route() {
    return {
      verb: 'get',
      path: '/uuid',
    };
  }

  async do(req) {
    return { id: uuid() };
  }
}

module.exports = UuidAction;
