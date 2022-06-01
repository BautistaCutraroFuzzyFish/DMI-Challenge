const { getIsGreaterController } = require('../controllers');
const { getIsGreaterSchema } = require('../schema');

// options
const isGreaterOpts = {
  schema: getIsGreaterSchema,
  handler: getIsGreaterController
};

function weatherRoutes(fastify, _options, done) {
  fastify.get('/isGreater', isGreaterOpts);

  done();
}

module.exports = weatherRoutes;
