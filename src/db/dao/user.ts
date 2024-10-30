import "server-only";
import {eq} from "drizzle-orm";
import {db} from "..";
import {users} from "../schema";

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
