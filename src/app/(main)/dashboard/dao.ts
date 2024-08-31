import "server-only";

import {eq} from "drizzle-orm";
import {cache} from "react";

import {db} from "@/db";
import {userInfos, users} from "@/db/schema";

/**
 * Retrieves a user from the database based on their email.
 *
 * @param email - The email of the user to retrieve.
 * @returns The user object if found, otherwise null.
 */
export let getUserByEmail = cache(async (email: string) => {
  try {
    const user = await db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        age: users.age,
        admin: users.admin,
        information: {
          about: userInfos.about,
        },
      })
      .from(users)
      .where(eq(users.email, email))
      .innerJoin(userInfos, eq(users.id, userInfos.userId));

    return user[0];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
});

export type User = Awaited<ReturnType<typeof getUserByEmail>>;
