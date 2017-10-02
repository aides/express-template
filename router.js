const glob = require('glob');
const path = require('path');
const Ajv = require('ajv');
const ajv = new Ajv();

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

  if (action.schema) {
    action._validate = ajv.compile(action.schema);
  }

  router[action.route.verb](action.route.path, async (req, res, next) => {
    try {
      // Optional validation handling
      if (req.body && action._validate) {
        if (!action._validate(req.body)) {
          const errorMessage = action._validate.errors.map((e) => e.message).join('; ');
          throw new Error('Validation Error: ' + errorMessage);
        }
      }

      const result = await action.do(req);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  });
}

module.exports = router;
