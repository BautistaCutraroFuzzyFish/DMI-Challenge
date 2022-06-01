const services = require('../services');

const getIsGreaterController = async (req, reply) => {
  const { query } = req;
  const response = await services.getIsGreaterService(query);
  reply.code(200).send(response);
};

module.exports = {
  getIsGreaterController
};
