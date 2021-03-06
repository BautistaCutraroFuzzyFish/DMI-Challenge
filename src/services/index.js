const fetch = require('node-fetch');

const getIsGreaterService = async ({ lat, lon, units, tempToCompare }) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=hourly,daily,minutely,alerts&appid=${process.env.API_KEY}`
    );
    const data = await response.json();

    if (!response.ok) {
      const error = new Error();
      error.status = response.status;
      error.message = data.message;
      throw error;
    }

    const isGreater = data?.current?.temp > tempToCompare;

    return { status: 200, data: { isGreater } };
  } catch (e) {
    return {
      status: e.status || 500,
      data: {
        error: e.message
      }
    };
  }
};

module.exports = {
  getIsGreaterService
};
