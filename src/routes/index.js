const { getIsGreaterController } = require('../controllers');
const { getIsGreaterSchema } = require('../schema');

// options
const isGreaterOpts = {
  schema: getIsGreaterSchema,
  handler: getIsGreaterController
};

const weatherRoutes = (fastify, _options, done) => {
  fastify.get('/is-greater', isGreaterOpts);

  done();
};

module.exports = weatherRoutes;
