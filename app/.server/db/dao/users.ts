import {eq} from "drizzle-orm";
import {db} from "..";
import {users} from "../schema";

export async function getUserByEmail(email: string) {
  try {
    let r = await db
      .select({
        id: users.id,
        email: users.email,
        password: users.password,
      })
      .from(users)
      .where(eq(users.email, email));

    if (r.length > 0) {
      return r[0];
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function insertUser(email: string, password: string) {
  try {
    await db.insert(users).values({
      email,
      password,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getUserById(id: number) {
  try {
    let r = await db
      .select({
        id: users.id,
        email: users.email,
        password: users.password,
      })
      .from(users)
      .where(eq(users.id, id));

    if (r.length > 0) {
      return r[0];
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
