module.exports = {
  server: {
    port: 9999,
  },
  logging: {
    useMorganForRequests: true,
    pino: {
      level: 'debug',
      prettyPrint: true,
    },
  },
};
