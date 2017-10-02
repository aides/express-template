const shortid = require('shortid');

class ShortIdAction {
  get route() {
    return {
      verb: 'get',
      path: '/shortid',
    };
  }

  async do(req) {
    return { id: shortid.generate() };
  }
}

module.exports = ShortIdAction;
