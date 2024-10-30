import "server-only";
import type {z} from "zod";

/**
 * Formats an array of Zod issues into a Map where the keys are the error paths and the values are objects containing the error message and code.
 *
 * @param errors - An array of Zod issues to format.
 * @returns A Map where each key is an error path and each value is an object containing the error message and code.
 */
export function formatZodErrors(errors: z.ZodIssue[]) {
  let result = new Map<string, {message: string; code: string}>();
  for (let error of errors) {
    let obj = {
      message: error.message.replace("String", pathToString(error.path)),
      code: error.code,
    };
    result.set(pathToString(error.path), obj);
  }
  return result;
}

export function formatErrors(errors: Record<string, string>[]) {
  let result = new Map<string, {message: string}>();
  for (let error of errors) {
    console.log("error", error);
    let obj = {
      message: error.message,
    };
    result.set(error.name, obj);
  }
  return result;
}

function pathToString(path: (string | number)[]) {
  return typeof path[0] === "string" ? path[0] : typeof path[0].toString();
}
