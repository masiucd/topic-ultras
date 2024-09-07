/**
 * Executes a function safely and returns a tuple indicating success or failure.
 *
 * @param fn - The function to be executed.
 * @returns A tuple containing a boolean indicating success (true) or failure (false), and an error object if an error occurred during execution.
 */
export function safe(fn: () => void) {
  try {
    fn();
    return [true, null];
  } catch (error) {
    return [false, error];
  }
}

/**
 * Wraps a promise with error handling and optional finally function.
 *
 * @template T - The type of the promise result.
 * @param {Promise<T>} promise - The promise to be wrapped.
 * @param {() => void} [finallyFn] - Optional function to be executed in the finally block.
 * @returns {Promise<[T | null, Error | null]>} - A promise that resolves to an array containing the result or error.
 */
export function safeAwait<T>(promise: Promise<T>, finallyFn?: () => void) {
  return promise
    .then((data) => {
      if (data instanceof Error) {
        throwNativeError(data);
        return [null, data];
      }
      return [data, null];
    })
    .catch((error) => {
      return [null, error];
    })
    .finally(() => {
      if (finallyFn && typeof finallyFn === "function") {
        finallyFn();
      }
    });
}

const nativeExceptions = [
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError,
].filter((error) => typeof error === "function");

function throwNativeError(error: Error) {
  for (let Exception of nativeExceptions) {
    if (error instanceof Exception) {
      throw error;
    }
  }
}
