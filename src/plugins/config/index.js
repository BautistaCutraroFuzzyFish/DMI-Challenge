const fastifyPlugin = require('fastify-plugin');
const fastifyEnv = require('fastify-env');

module.exports = fastifyPlugin((fastify, opts, next) => {
  const configSchema = {
    type: 'object',
    properties: {
      API_URL: {
        type: 'string',
        default: ''
      },
      API_KEY: {
        type: 'string',
        default: ''
      }
    }
  };

  const configOpts = {
    dotenv: true,
    ...opts
  };

  fastify.register(fastifyEnv, { schema: configSchema, ...configOpts });

  next();
});
