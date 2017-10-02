const queue = require('./queue');
const rabbit = queue.rabbit;

class Publisher {
  async publish(type, message) {
    await queue.connection;
    return await rabbit.publish('X-' + type, 'message', message);
  }
}

module.exports = new Publisher();
