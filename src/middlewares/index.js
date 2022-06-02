const cacheMiddleware = async (fastify, fn, params, cacheKey) => {
  try {
    const cacheValue = await fastify.redis.get(cacheKey);

    if (cacheValue) return JSON.parse(cacheValue);
  } catch (error) {
    console.error(`Error getting ${cacheKey} from cache`, error);
  }

  const value = await fn(params);

  try {
    if (value) {
      await fastify.redis.set(
        cacheKey,
        JSON.stringify(value),
        'PX', // ms
        fastify.cacheConfig.REDIS_CACHE_TTL
      );
    }
  } catch (error) {
    console.error(`Error setting ${cacheKey} in cache`, error);
  }

  return value;
};

module.exports = cacheMiddleware;
