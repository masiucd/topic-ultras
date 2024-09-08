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
 * @returns The expiration date.
 */
export function createExpirationDate(hours = 2): Date {
	let now = new Date();
	return addHours(now, hours);
}

/**
 * Creates an expiration date as a string.
 *
 * @param hours - The number of hours until expiration (default is 2 hours).
 * @returns The expiration date as a string in ISO format.
 */
export function createExpirationDateAsString(hours = 2): string {
	let now = new Date();
	let expiresAt = addHours(now, hours);
	return formatISO(expiresAt);
}

export function createExpirationDateAsNumber(hours = 2): number {
	let now = new Date();
	let expiresAt = addHours(now, hours);
	return expiresAt.getTime();
}
