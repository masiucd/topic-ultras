import "server-only";
import {eq} from "drizzle-orm";
import {db} from "..";
import {userInfos, users} from "../schema";

export async function getUserByEmail(email: string) {
	try {
		let result = await db
			.select({
				id: users.id,
				email: users.email,
				username: users.username,
				password: users.password,
			})
			.from(users)
			.where(eq(users.email, email));
		if (result.length === 0) {
			return null;
		}
		return result[0];
	} catch (error) {
		console.error("Error fetching user data:", error);
		return null;
	}
}

// This query is used after loged in to get the user profile data
export async function getUserById(id: number) {
	try {
		let result = await db
			.select({
				id: users.id,
				username: users.username,
				firstName: users.firstName,
				lastName: users.lastName,
				email: users.email,
				userInfos: {
					age: userInfos.age,
					gender: userInfos.gender,
					height: userInfos.height,
					weight: userInfos.weight,
				},
			})
			.from(users)
			.leftJoin(userInfos, eq(users.id, userInfos.userId))
			.where(eq(users.id, id));
		if (result.length > 0) {
			return result[0];
		}
		return null;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export type UserById = Awaited<ReturnType<typeof getUserById>>;
