import { createCache } from "../utils/cache.js";
import { test, expect } from "vitest";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 0.5 seconds
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const { getCache, setCache, destroyCache } = createCache(interval);

  setCache(key, val);
  const cached = getCache(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval * 2));
  const reaped = getCache(key);
  expect(reaped).toBe(undefined);

  destroyCache();
});
