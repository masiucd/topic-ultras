import "server-only";

import {eq} from "drizzle-orm";

import {db} from "@/db";
import {users} from "@/db/schema";
import {safe} from "@/lib/safe";

export async function getUserByEmail(email: string) {
  let userResult = safe(
    async () =>
      await db
        .select({
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          age: users.age,
          admin: users.admin,
        })
        .from(users)
        .where(eq(users.email, email)),
  );

  if (userResult.success) {
    let user = await userResult.value;
    return user[0];
  } else {
    // eslint-disable-next-line no-console
    console.error(userResult.error);
    return null;
  }
}

export type User = Awaited<ReturnType<typeof getUserByEmail>>;
