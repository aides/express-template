const counter = require('../counter');

class GetStatusAction {
  get route() {
    return {
      verb: 'get',
      path: '/status',
    };
  }

  async do(req) {
    return {
      uptime: process.uptime(),
      requests: counter.get(),
    };
  }
}

module.exports = GetStatusAction;
