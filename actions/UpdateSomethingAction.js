const bus = require('pubsub-js');

class UpdateSomethingAction {
  get route() {
    return {
      verb: 'post',
      path: '/update',
    };
  }

  get schema() {
    return {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          value: { type: 'number' },
        },
        required: ['name', 'value'],
        additionalProperties: false,
      },
    };
  }

  async do(req) {
    bus.publish('value.updated');
    return req.body;
  }
}

module.exports = UpdateSomethingAction;
