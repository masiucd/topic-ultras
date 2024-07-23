"use server";
import "server-only";

import {sql} from "drizzle-orm";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

import {db} from "@/_db/db";
import {users} from "@/_db/models/schema";
import {verifyPassword} from "@/lib/password";

// Just a prototype[e , real implementation will be done later
export async function login(data: FormData) {
  let email = data.get("email");
  let password = data.get("password");
  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Something is wrong");
  }

  let userInDb = await db
    .select({
      id: users.id,
      email: users.email,
      password: users.password,
      admin: users.admin,
    })
    .from(users)
    .where(sql`users.email = ${email} and users.password = ${password}`)
    .get();
  if (!userInDb) {
    console.log("User does not exist");
    return;
  }

  // TODO verify password
  let passwordVerified = await verifyPassword(password, userInDb.password);
  if (!passwordVerified) {
    console.log("Password is wrong");
    return;
  }

  console.log("user exists");
  let cookieStore = cookies();
  cookieStore.set(
    "user",
    JSON.stringify({
      ...userInDb,
      admin: userInDb.admin === "1",
      token: "FakeToken", // TODO
    }),
    {
      secure: true,
    },
  );
  // when success
  redirect("/profile");
}
