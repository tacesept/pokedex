interface CacheEntry<T> {
  createdAt: number;
  val: T;
}

export function createCache<T>(interval: number) {
  const storage = new Map<string, CacheEntry<T>>();

  let cleanupInterval: NodeJS.Timeout | null = setInterval(() => {
    const now = Date.now();

    for (const [key, entry] of storage) {
      if (now - entry.createdAt > interval) {
        storage.delete(key);
      }
    }
  }, interval);

  return {
    get: (key: string): T | undefined => {
      const entry = storage.get(key);
      if (!entry) {
        return undefined;
      }

      if (Date.now() - entry.createdAt > interval) {
        storage.delete(key);
        return undefined;
      }

      return entry.val;
    },
    set: (key: string, value: T) => {
      storage.set(key, {
        createdAt: Date.now(),
        val: value,
      });
    },
    destroy: () => {
      if (cleanupInterval) {
        clearInterval(cleanupInterval);
        cleanupInterval = null;
      }
      storage.clear();
    },
  };
}
