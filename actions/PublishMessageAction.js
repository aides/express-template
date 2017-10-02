const publisher = require('../publisher');

class PublishMessageAction {
  get route() {
    return {
      verb: 'post',
      path: '/message',
    };
  }

  async do(req) {
    return await publisher.publish('com.mk.messages.simple', { something: 'hello there!' });
  }
}

module.exports = PublishMessageAction;
