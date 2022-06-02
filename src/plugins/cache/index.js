const fastifyPlugin = require('fastify-plugin');
const Redis = require('ioredis');

module.exports = fastifyPlugin((fastify, opts, next) => {
  fastify.register(require('fastify-env'), {
    schema: {
      type: 'object',
      properties: {
        REDIS_PORT: {
          type: 'integer'
        },
        REDIS_HOST: {
          type: 'string'
        },
        REDIS_CACHE_TTL: {
          type: 'integer',
          default: 600000 // ms
        }
      }
    },
    confKey: 'cacheConfig',
    data: opts
  });

  fastify.register(
    fastifyPlugin(async fastify => {
      const redis = new Redis({
        host: fastify.cacheConfig.REDIS_HOST,
        port: fastify.cacheConfig.REDIS_PORT
      });

      fastify.register(require('fastify-redis'), { client: redis });
    })
  );

  next();
});
