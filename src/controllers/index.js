const services = require('../services');
const cache = require('../middlewares');

module.exports = fastify => {
  const getIsGreaterController = async (req, reply) => {
    const { query } = req;
    const cacheKey = `${query.lat}${query.lon}`;

    const response = await cache.cacheMiddleware(
      fastify,
      services.getIsGreaterService,
      query,
      cacheKey
    );

    reply.code(response.status).send(response.data);
  };

  return { getIsGreaterController };
};
