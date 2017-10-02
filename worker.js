const glob = require('glob');
const path = require('path');
const config = require('config');
const Queue = require('bull');
const logger = require('./logger');

class Worker {
  constructor() {
    const files = glob.sync(path.join(__dirname, 'workers/**/*Worker.js'));

    this.workers = {};

    for (const f of files) {
      const workerName = /.*\/(.*)\.js$/.exec(f)[1]; // TODO Check
      logger.info(`Loaded ${workerName}`);

      const workerQueue = new Queue(`Queue-${workerName}`, config.get('worker'));
      workerQueue.process(f);

      workerQueue.on('completed', (job, result) => logger.info('(completed) Finished Job!', job));
      workerQueue.on('failed', (err) => logger.error('Job failed with error!', { err }));
      workerQueue.on('error', (err) => logger.error('Some other worker queue error!', err));
      workerQueue.on('stalled', (job) => logger.warn('A job has stalled!', job));

      this.workers[workerName] = workerQueue;
    }
  }

  do(type, data) {
    const workerQueue = this.workers[type];
    if (!workerQueue) {
      throw new Error(`Unknown worker type: ${type}`);
    }

    workerQueue.add(data);
  }
}

module.exports = new Worker();
