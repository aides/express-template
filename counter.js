const counts = {};

module.exports = {
  count: (req, res, next) => {
    counts[req.path] ? counts[req.path]++ : counts[req.path] = 1;
    next();
  },

  get: () => {
    return counts;
  },
};
