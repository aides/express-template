const glob = require('glob');
const path = require('path');

const express = require('express');
const logger = require('./logger');

const router = express.Router();

// Just some default router for root path in case no actions are defined
router.get('/', (req, res) => {
  res.json({ data: 'Hello, Express Template!' });
});

const files = glob.sync(path.join(__dirname, 'actions/**/*Action.js'));

for (const f of files) {
  const action = new (require(f))();
  logger.info(`Loaded ${action.constructor.name}`);

  router[action.route.verb](action.route.path, async (req, res, next) => {
    try {
      const result = await action.do(req);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  });
}

module.exports = router;
