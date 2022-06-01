const fastify = require('fastify')({ logger: true });
const PORT = 3000;
const enviroment = require('./utils/enviroment');
const swagger = require('./utils/swagger');

// enviroment variables
fastify.register(require('fastify-env'), enviroment.options);

// swagger
fastify.register(require('fastify-swagger'), swagger.options);

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
