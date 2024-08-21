// Result type and safe function for error handling.
type Result<T, E> = {success: true; value: T} | {success: false; error: E};

// Wraps a function that may throw an error and returns a Result object.
export function safe<T>(fn: () => T): Result<T, Error> {
  try {
    const value = fn();
    return {success: true, value};
  } catch (error) {
    return {success: false, error: error instanceof Error ? error : new Error(String(error))};
  }
}

// Usage:

// import {safe} from "@/lib/safe";
//
// let result = safe(() => {
//   throw new Error("Oops!");
// });
//
// if (result.success) {
//   console.log(result.value);
// } else {
//   console.error(result.error);
