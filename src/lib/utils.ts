import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// debounce function that will be used in the search input
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  timeout = 300
) {
  let timer: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
