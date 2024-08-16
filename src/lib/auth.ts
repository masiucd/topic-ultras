import "server-only";

import {eq} from "drizzle-orm";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

import {db} from "@/db";
import {users} from "@/db/schema";
import {decrypt} from "@/lib/crypto";

export async function getUserFromSession() {
  let cookieStorage = cookies();
  let session = cookieStorage.get("session");
  if (!session) {
    redirect("/login");
  }
  let payload = await decrypt(session.value);
  let user = await getUserByEmail(payload.email);
  return user;
}

// TODO this function is already defined in the the DAO it just need to be more generic
async function getUserByEmail(email: string) {
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
