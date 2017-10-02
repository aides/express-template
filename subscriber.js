const glob = require('glob');
const path = require('path');
const logger = require('./logger');
const queue = require('./queue');
const rabbit = queue.rabbit;
const shortid = require('shortid');

module.exports = async () => {
  try {
    await queue.connection;
  } catch (err) {
    logger.error('Queue connection could not be established!', err);
    return;
  }

  rabbit.on('connected', () => logger.info('Queue is connected!'));
  rabbit.on('unreachable', () => logger.error('Queue is unreachable!')); // this probably should end up in process.exit
  rabbit.on('failed', () => logger.error('Queue connection failed!'));

  const files = glob.sync(path.join(__dirname, 'handlers/**/*Handler.js'));

  const exchanges = [];

  for (const f of files) {
    const handler = new (require(f))();
    logger.info(`Loaded ${handler.constructor.name}`);

    // probably change to handler.binding for clarity
    const exchangeName = 'X-' + handler.config.type;

    if (exchanges.indexOf(exchangeName) < 0) {
      await rabbit.addExchange(exchangeName, 'fanout', { durable: true, persistent: true });
      exchanges.push(exchangeName);
    }

    const queueName = 'Q-' + handler.config.type + '-' + shortid.generate();

    await rabbit.addQueue(queueName, { autoDelete: true, durable: true });
    await rabbit.bindQueue(exchangeName, queueName);

    rabbit.handle('message', async (message) => {
      try {
        await handler.do(message.body); // probably pass everything, not only body
        message.ack();
      } catch (error) {
        logger.error(error);
        message.nack();
      }
    }, queueName);

    rabbit.startSubscription(queueName);
  }
};
