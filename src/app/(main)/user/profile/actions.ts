"use server";
import "server-only";

import {notFound} from "next/navigation";

import {db} from "@/db";
import {users} from "@/db/schema";
import {getUserFromSession} from "@/lib/auth";
import {validateFormData} from "@/lib/utils";

export async function updateUser(data: FormData) {
  let user = await getUserFromSession();
  if (!user) {
    notFound();
  }
  let [ok, values] = validateFormData(data, ["email", "password"]);
  if (!ok) {
    notFound();
  }
  let email = values[0];
  let newPassword = values[1];
  // email ore password can be empty
  if (email === "" && newPassword !== "") {
    await db.update(users).set({password: newPassword});
  } else if (email !== "" && newPassword === "") {
    await db.update(users).set({email});
  } else {
    await db.update(users).set({email, password: newPassword});
  }
}
