"use server";
import "server-only";

import {eq} from "drizzle-orm";
import {redirect} from "next/navigation";

import {db} from "@/db";
import {users} from "@/db/schema";
import {getUserFromSession} from "@/lib/auth";
import {validateFormData} from "@/lib/utils";

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

  // email ore password can be empty
  if (!newEmail && newPassword) {
    await db
      .update(users)
      .set({password: newPassword})
      .where(eq(users.id, Number(userId)))
      .returning({id: users.id});
  } else if (newEmail && !newPassword) {
    await db
      .update(users)
      .set({email: newEmail})
      .where(eq(users.id, Number(userId)))
      .returning({id: users.id});
  } else {
    await db
      .update(users)
      .set({email: newEmail, password: newPassword})
      .where(eq(users.id, Number(userId)))
      .returning({id: users.id});
  }
}
