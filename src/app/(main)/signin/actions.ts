"use server";
import "server-only";

import {eq} from "drizzle-orm";
import {redirect} from "next/navigation";

import {db} from "@/db";
import {users} from "@/db/schema";
import {getExpiresInHours, setCookie} from "@/lib/cookies";
import {encrypt} from "@/lib/crypto";
import {verifyPassword} from "@/lib/password";

export async function login(
  prevState: {message: string} | null,
  data: FormData
) {
  let email = data.get("email");
  let password = data.get("password");
  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Invalid email or password");
  }
  let user = await getUserByEmail(email);
  if (user === null) {
    return {message: "Wrong email or password"};
  }
  let isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    return {message: "Wrong email or password"};
  }

  setCookie(
    "session",
    await encrypt({
      id: user.id,
      email: user.email,
      iat: Date.now(),
      exp: getExpiresInHours(2),
    })
  );

  redirect("/user/profile");
}

async function getUserByEmail(email: string) {
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
