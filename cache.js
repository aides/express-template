const logger = require('./logger');

const config = require('config');
const redisCacheConfig = config.get('cache.redis');
const keyPrefix = config.get('cache.keyPrefix');
const ttl = config.get('cache.ttl');

const cacheManager = require('cache-manager');
const redisStore = require('cache-manager-redis');

class CacheProvider {
  constructor() {
    const options = Object.assign({}, redisCacheConfig);
    options.store = redisStore;

    this.redisCache = cacheManager.caching(options);

    // listen for redis connection error event
    this.redisCache.store.events.on('redisError', (error) => {
      logger.error('Redis cache store encoutnered an error: ', error);
    });
  }

  use(key, loader) {
    return this.redisCache.wrap(keyPrefix + key, loader, { ttl: ttl });
  }

  clear(key) {
    return new Promise((resolve, reject) => {
      this.redisCache.del(keyPrefix + key, (error) => {
        if (error) {
          reject(error);
        }

        resolve();
      });
    });
  }
}

module.exports = new CacheProvider();
