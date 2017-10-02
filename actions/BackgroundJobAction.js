const worker = require('../worker.js');

class BackgroundJobAction {
  get route() {
    return {
      verb: 'post',
      path: '/job',
    };
  }

  async do(req) {
    worker.do('SimpleWorker', { data: 'Something' });
  }
}

module.exports = BackgroundJobAction;
