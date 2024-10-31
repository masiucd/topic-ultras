import {cookies} from "next/headers";
import "server-only";
import {getUserByEmail} from "@/db/dao/user";
import {decrypt} from "./jwt";

export async function isLoggedIn() {
	let cookieStore = await cookies();
	let session = cookieStore.get("session");
	if (!session) {
		return false;
	}
	// Decrypt session
	let decrypted = await decrypt(session.value);
	console.log("🚀 ~ isLoggedIn ~ decrypted:", decrypted);
	if (decrypted === null) {
		return false;
	}
	// TODO using redis somehow
	let user = await getUserByEmail(decrypted.email);
	if (user === null) {
		return false;
	}

	console.log("user", user);
	return true;
}
