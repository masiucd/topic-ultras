import {cookies} from "next/headers";
import "server-only";
import {getUserByEmail} from "@/db/dao/user";
import {decrypt} from "./jwt";

/**
 * Retrieves the session ID of the current user.
 *
 * This function attempts to get the session cookie, decrypts it, and then fetches the user by email.
 * If the session or decrypted data is invalid, it returns null.
 *
 * @returns {Promise<string | null>} The user ID if the session is valid, otherwise null.
 */
export async function getSessionId() {
	let cookieStore = await cookies();
	let session = cookieStore.get("session");
	if (!session) {
		return null;
	}
	// Decrypt session
	let decrypted = await decrypt(session.value);

	if (decrypted === null) {
		return null;
	}
	// TODO using redis somehow
	let user = await getUserByEmail(decrypted.email);
	return user !== null ? user.id : null;
}
