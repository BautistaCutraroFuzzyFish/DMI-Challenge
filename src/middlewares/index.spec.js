const cacheMiddleware = require('../middlewares');

const cacheValue = JSON.stringify({
  item: {
    id: 'cached'
  }
});

const value = {
  item: {
    id: 'originalValue'
  }
};

describe('Cache middleware', () => {
  let fastifyMock;
  let cacheConfigMock;
  let fnMock;
  let redisMock;

  const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

  beforeEach(() => {
    fnMock = jest.fn().mockReturnValue(Promise.resolve(value));

    redisMock = {
      get: jest.fn(id => {
        if (id === 'cachedError') {
          return Promise.reject('error');
        }
        if (id === 'cachedCacheKey') {
          return Promise.resolve(cacheValue);
        }

        return Promise.resolve(undefined);
      }),
      set: jest.fn(id => {
        if (id === 'error') {
          return Promise.reject('error');
        }

        return Promise.resolve(value);
      })
    };

    cacheConfigMock = {
      REDIS_CACHE_TTL: 600000
    };

    fastifyMock = {
      redis: redisMock,
      cacheConfig: cacheConfigMock
    };
  });

  describe('should return cached value', () => {
    let response;
    beforeEach(async () => {
      response = await cacheMiddleware(
        fastifyMock,
        fnMock,
        { paramOne: 'param' },
        'cachedCacheKey'
      );
    });

    it('should return cached value', () => {
      expect(response).toEqual(JSON.parse(cacheValue));
      expect(fnMock).not.toHaveBeenCalled();
    });
  });

  describe('should throw an error on get value from cache', () => {
    beforeEach(async () => {
      await cacheMiddleware(
        fastifyMock,
        fnMock,
        { paramOne: 'param' },
        'cachedError'
      );
    });

    it('should call console.error', () => {
      expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'Error getting cachedError from cache',
        'error'
      );
    });
  });

  describe('should get the value and save to cache', () => {
    let response;
    beforeEach(async () => {
      response = await cacheMiddleware(
        fastifyMock,
        fnMock,
        { paramOne: 'param' },
        'originalCacheKey'
      );
    });

    it('should return original value and save it in cache', () => {
      expect(response).toEqual(value);
      expect(fnMock).toHaveBeenCalledTimes(1);
      expect(fnMock).toHaveBeenCalledWith({ paramOne: 'param' });
      expect(redisMock.set).toHaveBeenCalledWith(
        'originalCacheKey',
        JSON.stringify(value),
        'PX',
        cacheConfigMock.REDIS_CACHE_TTL
      );
    });
  });

  describe('should throw an error on set value in cache', () => {
    beforeEach(async () => {
      await cacheMiddleware(
        fastifyMock,
        fnMock,
        { paramOne: 'param' },
        'error'
      );
    });

    it('should call console.error', () => {
      expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'Error setting error in cache',
        'error'
      );
    });
  });
});
