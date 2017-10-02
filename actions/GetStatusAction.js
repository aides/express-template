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
    };
  }
}

module.exports = GetStatusAction;
