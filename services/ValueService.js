const cache = require('../cache');

class ValueService {
  getValue() {
    return cache.use('myvalue', () => {
      let x = 0;

      for (let i = 0; i < 10000000; i++) {
        x += Math.sin(i);
      }

      return x;
    });
  }

  setValue() {
    return cache.clear('myvalue');
  }
}

module.exports = ValueService;
