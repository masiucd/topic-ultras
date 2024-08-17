"use server";
import "server-only";

import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import {db} from "@/db";
import {users} from "@/db/schema";
import {getUserFromSession} from "@/lib/auth";
import {getExpiresInHours, setCookie} from "@/lib/cookies";
import {encrypt} from "@/lib/crypto";
import {hashPassword} from "@/lib/password";
import {validateFormData} from "@/lib/utils";

// TODO improve the function
export async function updateUser(data: FormData) {
  let user = await getUserFromSession();
  if (user === null) {
    redirect("/login");
  }
  // TODO we need to check so the new email does not already exists
  let values = validateFormData(data, ["email", "password", "userid"]);

  let newEmail = values["email"];
  let newPassword = values["password"];
  let userId = values["userid"];

  let v;
  // email ore password can be empty
  if (!newEmail && newPassword) {
    v = await db
      .update(users)
      .set({password: await hashPassword(newPassword)})
      .where(eq(users.id, Number(userId)))
      .returning({id: users.id, email: users.email});
  } else if (newEmail && !newPassword) {
    v = await db
      .update(users)
      .set({email: newEmail})
      .where(eq(users.id, Number(userId)))
      .returning({id: users.id, email: users.email});
  } else {
    v = await db
      .update(users)
      .set({email: newEmail, password: await hashPassword(newPassword)})
      .where(eq(users.id, Number(userId)))
      .returning({id: users.id, email: users.email});
  }

  setCookie(
    "session",
    await encrypt({
      id: v[0].id,
      email: v[0].email,
      iat: Date.now(),
      exp: getExpiresInHours(2),
    })
  );

  revalidatePath("/user/profile");
}
