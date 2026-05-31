// Pure in-memory cache — no Redis dependency
const store = new Map();

const cache = {
  async get(key) {
    return store.get(key) ?? null;
  },
  async set(key, value, exSeconds) {
    store.set(key, value);
    if (exSeconds) setTimeout(() => store.delete(key), exSeconds * 1000);
  },
  async incr(key) {
    const val = (parseInt(store.get(key) || '0') + 1);
    store.set(key, String(val));
    return val;
  },
  async sadd(key, ...members) {
    const set = store.get(key) instanceof Set ? store.get(key) : new Set();
    let added = 0;
    members.forEach(m => { if (!set.has(m)) { set.add(m); added++; } });
    store.set(key, set);
    return added;
  },
  async srem(key, ...members) {
    const set = store.get(key);
    if (set instanceof Set) members.forEach(m => set.delete(m));
    return members.length;
  },
  async scard(key) {
    const set = store.get(key);
    return set instanceof Set ? set.size : 0;
  },
};

module.exports = { cache };
