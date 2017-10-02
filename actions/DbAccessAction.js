const db = require('../db');

class DbAccessAction {
  get route() {
    return {
      verb: 'get',
      path: '/db',
    };
  }

  async do(req) {
    const clients = await db.any('SELECT "eventId" FROM events');
    return clients;
  }
}

module.exports = DbAccessAction;
