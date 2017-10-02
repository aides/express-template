const superagent = require('superagent');

class RemoteCallAction {
  get route() {
    return {
      verb: 'get',
      path: '/remote',
    };
  }

  async do(req) {
    const result =
      await superagent.get('https://cs-ops.intappx.com/rest/v1/ops/public/tenants/')
        .set('Authorization', 'Basic am9uOnlvdWtub3dub3RoaW5n');

    return result.body;
  }
}

module.exports = RemoteCallAction;
