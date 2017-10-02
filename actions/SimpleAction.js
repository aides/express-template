const uuid = require('uuid/v4');
const shortid = require('shortid');
const superagent = require('superagent');
const logger = require('../logger');

class SimpleAction {
  get route() {
    return {
      verb: 'get',
      path: '/simple',
    };
  }

  async do(req) {
    const response = await superagent.get('https://jsonplaceholder.typicode.com/posts/1');

    return {
      id: uuid(),
      shortId: shortid.generate(),
      data: response.body,
    };
  }
}

module.exports = SimpleAction;
