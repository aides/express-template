const glob = require('glob');
const path = require('path');
const CronJob = require('cron').CronJob;

const logger = require('./logger');

const files = glob.sync(path.join(__dirname, 'tasks/**/*Task.js'));

const tasks = [];

// This can be also rewritten to bull's queue and processors
// but it is just an example of a lightweight scheduled task
for (const f of files) {
  const task = new (require(f))();
  logger.info(`Loaded ${task.constructor.name}`);

  const cron = new CronJob(
    task.cron,
    () => {
      task.tick()
        .catch((err) => {
          logger.error(err, 'Scheduled Task Exception');
        });
    },
    null, true, null, null, false);

  // save cron object back to Task class for control
  tasks.push(cron);
}

module.exports = tasks;
