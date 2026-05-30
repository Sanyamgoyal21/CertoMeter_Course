const Redis = require('ioredis');

let redisClient = null;
const inMemoryStore = new Map();

async function getRedisClient() {
  if (redisClient) return redisClient;

  try {
    const client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD || undefined,
      lazyConnect: true,
      connectTimeout: 3000,
      retryStrategy: () => null, // Don't retry — fall back to memory
    });

    await client.connect();
    redisClient = client;
    console.log('✅ Redis connected');
    return redisClient;
  } catch (error) {
    console.warn('⚠️  Redis unavailable — using in-memory store:', error.message);
    return null;
  }
}

// Unified cache interface (Redis or in-memory fallback)
const cache = {
  async get(key) {
    if (redisClient) return redisClient.get(key);
    return inMemoryStore.get(key) ?? null;
  },
  async set(key, value, exSeconds) {
    if (redisClient) return redisClient.set(key, value, 'EX', exSeconds);
    inMemoryStore.set(key, value);
    if (exSeconds) setTimeout(() => inMemoryStore.delete(key), exSeconds * 1000);
  },
  async incr(key) {
    if (redisClient) return redisClient.incr(key);
    const val = (parseInt(inMemoryStore.get(key) || '0') + 1);
    inMemoryStore.set(key, String(val));
    return val;
  },
  async sadd(key, ...members) {
    if (redisClient) return redisClient.sadd(key, ...members);
    const set = inMemoryStore.get(key) || new Set();
    let added = 0;
    members.forEach(m => { if (!set.has(m)) { set.add(m); added++; } });
    inMemoryStore.set(key, set);
    return added; // 0 if already existed (matches Redis behaviour)
  },
  async srem(key, ...members) {
    if (redisClient) return redisClient.srem(key, ...members);
    const set = inMemoryStore.get(key) || new Set();
    members.forEach(m => set.delete(m));
    inMemoryStore.set(key, set);
    return members.length;
  },
  async scard(key) {
    if (redisClient) return redisClient.scard(key);
    const set = inMemoryStore.get(key);
    if (set instanceof Set) return set.size;
    return 0;
  },
};

module.exports = { getRedisClient, cache };
