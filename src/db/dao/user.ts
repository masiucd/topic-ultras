import "server-only";

import {eq} from "drizzle-orm";

import {db} from "..";
import {users} from "../schema";

export async function getUserByEmail(email: string) {
  try {
    let user = await db
      .select({id: users.id, email: users.email, password: users.password})
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
