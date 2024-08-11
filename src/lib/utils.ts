import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms = 2000) {
  return new Promise((res) => setTimeout(res, ms));
}

export function slugify(input: string) {
  return input.toLowerCase().replace(/\s/g, "-");
}

// TODO do we want to store the slug on the foods table?
export function unSlugify(input: string) {
  return input.replace(/-/g, " ");
}
