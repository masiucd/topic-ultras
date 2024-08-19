import "server-only";

import {eq} from "drizzle-orm";

import {db} from "@/db";
import {users} from "@/db/schema";

export async function getUserByEmail(email: string) {
  try {
    let user = await db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        age: users.age,
        admin: users.admin,
      })
      .from(users)
      .where(eq(users.email, email));
    if (user.length > 0) {
      return user[0];
    }
    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
}

export type User = Awaited<ReturnType<typeof getUserByEmail>>;
