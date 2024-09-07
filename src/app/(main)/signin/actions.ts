"use server";
import "server-only";

// import {parseISO} from "date-fns";
import {eq} from "drizzle-orm";
import {redirect} from "next/navigation";

import {db} from "@/db";
import {sessions, users} from "@/db/schema";
import {createExpirationDate, getExpiresInHours, setCookie} from "@/lib/cookies";
import {encrypt} from "@/lib/crypto";
import {verifyPassword} from "@/lib/password";

export async function login(prevState: {ok: boolean} | null, data: FormData) {
  let email = data.get("email");
  let password = data.get("password");
  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Invalid email or password");
  }
  let user = await getUserByEmail(email);
  if (user === null) {
    return {ok: false};
  }
  let isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    return {ok: false};
  }
  // TODO use Reddis for session storage
  let token = await encrypt({
    id: user.id,
    email: user.email,
    iat: Date.now(),
    exp: getExpiresInHours(2),
  });

  // setCookie("session", token);
  let resultToken = await insertIntoSessions(user.id, token);

  if (resultToken !== null) {
    setCookie("session", resultToken.token);
    redirect("/dashboard");
  }
  return {ok: true};
}

async function getUserByEmail(email: string) {
  try {
    let result = await db
      .select({id: users.id, email: users.email, password: users.password, admin: users.admin})
      .from(users)
      .where(eq(users.email, email));

    if (result.length > 0) {
      let user = result;
      return user[0];
    } else {
      return null;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
}

async function insertIntoSessions(userId: number, token: string) {
  try {
    let res = await db
      .insert(sessions)
      .values({
        userId,
        token,
        expiresAt: createExpirationDate(),
        // expires: createExpirationDate(),
      })
      .returning({token: sessions.token});
    return res[0];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
}
