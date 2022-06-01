const errorResponse = {
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'Error message'
    }
  },
  required: ['error']
};

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
          type: 'boolean',
          description: 'Is the temperature greater than the tempToCompare'
        }
      },
      required: ['isGreater']
    },
    '4xx': errorResponse,
    '5xx': errorResponse
  }
};

module.exports = {
  getIsGreaterSchema
};
