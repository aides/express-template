module.exports = {
  server: {
    port: 9999,
  },
  db: {
    host: 'localhost',
    port: 5432,
    database: 'demodb',
    user: 'postgres',
    password: null,
  },
  logging: {
    useMorganForRequests: true,
    pino: {
      level: 'debug',
      prettyPrint: true,
    },
  },
  queue: {
    user: 'guest',
    pass: 'guest',
    server: ['127.0.0.1'],
    port: 5672,
    timeout: 1000,
    heartbeat: 5,
    failAfter: 60, // seconds of 'failed' before 'unreachable'
    retryLimit: 100, // number of attemps before 'unreachable'
  },
  worker: {
    redis: {
      port: 6379,
      host: '127.0.0.1',
      password: null,
    },
  },
  cache: {
    keyPrefix: 'cache.7654.',
    ttl: 60,
    redis: {
      host: 'localhost',
      port: 6379,
      auth_pass: null,
      db: 0,
      ttl: 600,
    },
  },
};
