interface CacheEntry<T> {
  createdAt: number;
  val: T;
}

export function createCache<T>(interval: number = 1000 * 60 * 5) {
  const storage = new Map<string, CacheEntry<any>>();

  let cleanupInterval: NodeJS.Timeout | null = setInterval(() => {
    const now = Date.now();

    for (const [key, entry] of storage) {
      if (now - entry.createdAt > interval) {
        storage.delete(key);
      }
    }
  }, interval);

  return {
    getCache: <T>(key: string) => {
      const entry = storage.get(key);
      if (!entry) {
        return undefined;
      }

      if (Date.now() - entry.createdAt > interval) {
        storage.delete(key);
        return undefined;
      }

      return entry.val as T;
    },
    setCache: (key: string, value: T) => {
      storage.set(key, {
        createdAt: Date.now(),
        val: value,
      });
    },
    destroyCache: () => {
      if (cleanupInterval) {
        clearInterval(cleanupInterval);
        cleanupInterval = null;
      }
      storage.clear();
    },
  };
}
