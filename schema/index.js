const getIsGreaterSchema = {
  title: 'Is Greater',
  querystring: {
    type: 'object',
    properties: {
      lat: { type: 'string' },
      lon: { type: 'string' },
      units: {
        type: 'string',
        enum: ['standard', 'metric', 'imperial'],
        default: 'metric'
      },
      tempToCompare: { type: 'number', default: 15 }
    },
    required: ['lat', 'lon']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        isGreater: {
          type: 'boolean'
        }
      }
    }
  }
};

module.exports = {
  getIsGreaterSchema
};
