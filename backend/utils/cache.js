// Simple in-memory cache for static data
class SimpleCache {
  constructor() {
    this.cache = new Map();
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value, ttl = null) {
    const item = {
      value,
      expiry: ttl ? Date.now() + ttl : null
    };
    this.cache.set(key, item);
  }

  has(key) {
    const item = this.cache.get(key);
    if (!item) return false;
    
    // Check if item has expired
    if (item.expiry && Date.now() > item.expiry) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  clear() {
    this.cache.clear();
  }
}

module.exports = new SimpleCache();
