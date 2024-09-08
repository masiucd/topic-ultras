import "server-only";

import {getExpire} from "@/db/redis";
import {decrypt} from "@/lib/crypto";
import {differenceInMilliseconds} from "date-fns";
import {cookies} from "next/headers";
import {cache} from "react";

export type User = NonNullable<Awaited<ReturnType<typeof isAuthorized>>>;

/**
 * Checks if the user is authorized.
 *
 * @returns A promise that resolves to an object containing the user's id and email if authorized, or null if not authorized.
 */
export let isAuthorized = cache(async () => {
	let cookieStorage = cookies();
	let cookieSession = cookieStorage.get("session");
	if (!cookieSession) {
		return null;
	}
	let payload = await decrypt(cookieSession.value);
	if (payload?.exp) {
		let now = Date.now();
		if (differenceInMilliseconds(now, payload.exp) > 0) {
			return null;
		}
		let sessionToken = await getExpire(`session:${payload.id}`);
		if (!sessionToken || sessionToken !== cookieSession.value) {
			return null;
		}
		return {id: payload.id, email: payload.email};
	}
	return null;
});
