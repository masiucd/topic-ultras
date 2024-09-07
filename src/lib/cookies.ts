import "server-only";

import {addHours, formatISO} from "date-fns";
import {cookies} from "next/headers";

export function setCookie(key: string, value: string, expiresInHours = 2) {
  let cookieStorage = cookies();
  cookieStorage.set(key, value, {
    secure: true,
    httpOnly: true,
    expires: getExpiresInHours(expiresInHours),
  });
}

/**
 * Calculates the expiration time in milliseconds based on the given number of hours.
 *
 * @param hours - The number of hours to add to the current time. Default is 2.
 * @returns The expiration time in milliseconds.
 */
export function getExpiresInHours(hours = 2) {
  return addHours(Date.now(), hours).getTime();
}

/**
 * Creates an expiration date for cookies.
 *
 * @param hours - The number of hours until the expiration date. Default is 2 hours.
 * @returns The formatted expiration date in ISO format.
 */
export function createExpirationDate(hours = 2) {
  let now = new Date();
  let expiresAt = addHours(now, hours);
  return formatISO(expiresAt);
}
