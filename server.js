const fastify = require('fastify')({ logger: true });
const PORT = 3000;

// ENV
fastify.register(require('fastify-env'), {
  dotenv: true,
  schema: {
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
  }
});

// swagger
fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Weather API',
      description: 'A simple weather API',
      version: '0.1.0'
    }
  }
});

// routes
fastify.register(require('./routes'));

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
