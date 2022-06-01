const fetch = require('node-fetch');

const getIsGreaterService = async ({ lat, lon, units, tempToCompare }) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=hourly,daily&appid=${process.env.API_KEY}`
    );
    const data = await response.json();

    const isGreater = data?.current?.temp > tempToCompare;

    return { isGreater };
  } catch (e) {
    console.log({ e });
  }
};

module.exports = {
  getIsGreaterService
};
