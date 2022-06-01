const services = require('../services');

const getIsGreaterController = async (req, reply) => {
  const { query } = req;
  const response = await services.getIsGreaterService(query);

  reply.code(response.status).send(response.data);
};

module.exports = {
  getIsGreaterController
};
