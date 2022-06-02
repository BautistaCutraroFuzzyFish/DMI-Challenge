const fastifyPlugin = require('fastify-plugin');
const fastifySwagger = require('fastify-swagger');

module.exports = fastifyPlugin((fastify, opts, next) => {
  const swaggerConfig = {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'Weather API',
        description: 'A simple weather API',
        version: '0.0.1'
      }
    },
    ...opts
  };

  fastify.register(fastifySwagger, swaggerConfig);

  next();
});
