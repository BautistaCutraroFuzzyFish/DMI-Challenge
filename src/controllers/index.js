const services = require('../services');
const cacheMiddleware = require('../middlewares');

module.exports = fastify => {
  const getIsGreaterController = async (req, reply) => {
    const { query } = req;
    const cacheKey = `${query.lat}${query.lon}`;

    const response = await cacheMiddleware(
      fastify,
      services.getIsGreaterService,
      query,
      cacheKey
    );

    reply.code(response.status).send(response.data);
  };

  return { getIsGreaterController };
};
