module.exports = {
  options: {
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
  }
};
