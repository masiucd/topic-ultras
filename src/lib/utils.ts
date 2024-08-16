import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms = 2000) {
  return new Promise((res) => setTimeout(res, ms));
}

export function validateFormData(
  data: FormData,
  fields: string[]
): [boolean, string[]] {
  let xs = [];
  for (const field of fields) {
    const value = data.get(field);
    if (typeof value === "string") {
      xs.push(value);
    }
  }
  return [xs.length === fields.length, xs];
}
