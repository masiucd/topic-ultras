"use server";
import "server-only";

import {db} from "@/db";
import {setExpire} from "@/db/redis";
import {users} from "@/db/schema";
import {createExpirationDateAsNumber, setCookie} from "@/lib/cookies";
import {encrypt} from "@/lib/crypto";
import {verifyPassword} from "@/lib/password";
import {printErrorMessage} from "@/lib/utils";
import {eq} from "drizzle-orm";
import {redirect} from "next/navigation";

export async function signin(_prevState: {ok: boolean} | null, data: FormData) {
	let email = data.get("email");
	let password = data.get("password");
	if (typeof email !== "string" || typeof password !== "string") {
		throw new Error("Invalid email or password");
	}
	let user = await getUserByEmail(email);
	if (user === null || !user.admin) {
		return {ok: false};
	}
	let isValidPassword = await verifyPassword(password, user.password);
	if (!isValidPassword) {
		return {ok: false};
	}

	try {
		await setSession(user.id, user.email);
		redirect("/dashboard");
	} catch (error) {
		printErrorMessage(error);
		return {ok: false};
	}
}

async function getUserByEmail(email: string) {
	try {
		let result = await db
			.select({
				id: users.id,
				email: users.email,
				password: users.password,
				admin: users.admin,
			})
			.from(users)
			.where(eq(users.email, email));

		if (result.length > 0) {
			let user = result;
			return user[0];
		}
		return null;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error);
		return null;
	}
}

async function setSession(userId: number, userEmail: string) {
	try {
		let token = await encrypt({
			id: userId,
			email: userEmail,
			iat: Date.now(),
			exp: createExpirationDateAsNumber(),
		});
		let ok = await setExpire({
			key: `session:${userId}`,
			value: token,
		});
		if (ok === "OK") {
			setCookie("session", token);
		}
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error);
	}
}
