const config = require('config');
const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');

const router = require('./router');
const logger = require('./logger');

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(compression());

// Conditionally use either simple morgan logger or fancy pino request logger.
if (config.get('logging.useMorganForRequests')) {
  app.use(morgan('dev'));
} else {
  const pino = require('express-pino-logger')(config.get('logger'));
  app.use(pino);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.use('/api', router);

app.get('/api/*', (req, res) => {
  res.status(404).json({
    code: 404,
    message: 'Not found',
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use((err, req, res, next) => {
  logger.error(err, 'Application Exception');
  const code = err.code || 500;
  res.status(code).json({
    code: code,
    message: err.message,
    stack: err.stack,
  });
});

app.listen(config.get('server.port'), () => {
  logger.info(`Server has started at ${config.get('server.port')}`);
});
