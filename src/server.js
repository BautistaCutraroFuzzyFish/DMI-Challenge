const fastify = require('fastify')({ logger: true });
const PORT = 3000;
const config = require('./plugins/config');
const swagger = require('./plugins/swagger');
const routes = require('./routes');

fastify.register(config);
fastify.register(swagger);
fastify.register(routes);

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
