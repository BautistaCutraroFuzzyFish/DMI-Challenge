const fetch = require('node-fetch');
const { getIsGreaterService } = require('.');

jest.mock('node-fetch');

const params = {
  lat: 10,
  lon: 20
};
describe('weather service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return isGreater in false and status 200', async () => {
    fetch.mockReturnValue(
      Promise.resolve({
        json: () => ({ current: { temp: 10 } }),
        ok: true
      })
    );

    const result = await getIsGreaterService(params);
    expect(result).toEqual({ data: { isGreater: false }, status: 200 });
  });

  it('should return isGreater in true and status 200', async () => {
    fetch.mockReturnValue(
      Promise.resolve({
        json: () => ({ current: { temp: 20 } }),
        ok: true
      })
    );

    const result = await getIsGreaterService(params);
    expect(result).toEqual({ data: { isGreater: false }, status: 200 });
  });

  it('should return error message and status code', async () => {
    fetch.mockReturnValue(
      Promise.resolve({
        json: () => ({ message: 'wrong latitude' }),
        ok: false,
        status: 400
      })
    );

    const result = await getIsGreaterService(params);
    expect(result).toEqual({ data: { error: 'wrong latitude' }, status: 400 });
  });

  it('should return status 500 by default when it is an error ', async () => {
    fetch.mockReturnValue(
      Promise.resolve({
        json: () => ({ message: 'wrong latitude' }),
        ok: false
      })
    );

    const result = await getIsGreaterService(params);
    expect(result).toEqual({ data: { error: 'wrong latitude' }, status: 500 });
  });
});
