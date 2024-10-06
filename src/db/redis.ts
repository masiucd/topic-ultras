// Redis connection
import Redis, {type RedisOptions} from "ioredis";

import env from "@/env";

function createRedisInstance() {
  try {
    let options: RedisOptions = {
      host: "localhost",
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      retryStrategy: (times: number) => {
        if (times > 3) {
          throw new Error(`Redis connection failed after ${times} attempts`);
        }
        return Math.min(times * 200, 1000);
      },
    };

    let redis = new Redis({
      port: Number.parseInt(env.REDIS_PORT, 10),
      family: 4, // 4 (IPv4) or 6 (IPv6)
      // password: "password",
      db: 0,
      ...options,
    });

    redis.on("error", (err) => {
      // eslint-disable-next-line no-console
      console.warn("Redis error", err);
    });

    return redis;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating redis instance");
  }
}
let redis = createRedisInstance();

const TWO_HOURS = 60 * 60 * 2;
/**
 * Sets a key-value pair in Redis with an optional expiration time.
 * @param {Object} options - The options for setting the key-value pair.
 * @param {string} options.key - The key to set in Redis.
 * @param {string} options.value - The value to set in Redis.
 * @param {number} [options.expirationInSeconds] - The expiration time in seconds (default: twoHours).
 * @returns {Promise<"OK">} A promise that resolves with "OK" if the key-value pair was set successfully.
 */
export async function setExpire({
  key,
  value,
  expirationInSeconds = TWO_HOURS,
}: {
  key: string;
  value: string;
  expirationInSeconds?: number;
}) {
  return await redis.setex(key, expirationInSeconds, value);
}

/**
 * Retrieves the expiration time of a Redis key in seconds.
 *
 * @param key - The key to retrieve the expiration time for.
 * @returns A Promise that resolves to the remaining time to live in seconds, or null if the key does not exist or has no associated expire.
 */
export async function getExpire(key: string): Promise<number | null> {
  return await redis.ttl(key);
}

/**
 * Retrieves the value of a Redis key.
 *
 * @param key - The key to retrieve the value for.
 * @returns A Promise that resolves to the value of the key, or null if the key does not exist.
 */
export async function getValue(key: string): Promise<string | null> {
  return await redis.get(key);
}
