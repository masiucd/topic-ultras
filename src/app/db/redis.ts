import "server-only";
// Redis connection
import {env} from "$/env";
import Redis, {type RedisOptions} from "ioredis";

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

type SetExpireOptions =
  | {
      key: string;
      value: string;
      expirationInSeconds: number;
      hours?: never;
    }
  | {
      key: string;
      value: string;
      expirationInSeconds?: never;
      hours: number;
    };

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
  expirationInSeconds,
  hours,
}: SetExpireOptions) {
  if (hours) {
    try {
      return await redis.setex(key, hours * 60 * 60, value);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  if (expirationInSeconds !== undefined) {
    try {
      return await redis.setex(key, expirationInSeconds, value);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  throw new Error(
    "expirationInSeconds must be defined if hours is not provided"
  );
}

export async function getExpire(key: string) {
  try {
    return await redis.getex(key);
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Retrieves the value of a Redis key.
 *
 * @param key - The key to retrieve the value for.
 * @returns A Promise that resolves to the value of the key, or null if the key does not exist.
 */
export async function getValue(key: string): Promise<string | null> {
  try {
    return await redis.get(key);
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Deletes a key from the Redis database.
 *
 * @param {string} key - The key to be deleted.
 * @returns {Promise<boolean | null>} - Returns `true` if the key was deleted, `false` if the key was not found,
 * or `null` if an error occurred.
 */
export async function deleteExpire(key: string) {
  try {
    let result = await redis.del(key);
    return result === 1; // 1 if the key was deleted, 0 if the key was not found
  } catch (error) {
    console.error(error);
    return null;
  }
}
