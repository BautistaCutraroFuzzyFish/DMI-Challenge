const schema = require('../schemas');

const weatherRoutes = (fastify, _options, done) => {
  const controller = require('../controllers')(fastify);

  fastify.get('/is-greater', {
    schema: schema.getIsGreaterSchema,
    handler: controller.getIsGreaterController
  });

  done();
};

module.exports = weatherRoutes;
