"use server";

import "server-only";

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function Logout() {
  deleteSession("session");
  redirect("/");
}

function deleteSession(key: string) {
  let cookieStore = cookies();
  cookieStore.delete(key);
}
