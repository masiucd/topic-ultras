import "server-only";

import {cookies} from "next/headers";
import {cache} from "react";

import {decrypt} from "@/lib/crypto";

export type User = NonNullable<Awaited<ReturnType<typeof isAuthorized>>>;

// isAuthorized function is used to check if the user is authorized or not.
// by caching the result of the function, we can avoid calling the function multiple times.
export let isAuthorized = cache(async () => {
  let cookieStorage = cookies();
  let session = cookieStorage.get("session");
  if (!session) {
    return null;
  }
  let payload = await decrypt(session.value);
  if (payload && payload.exp) {
    let now = Date.now();
    if (now > payload.exp) {
      return null;
    }
  }
  return {id: payload.id, email: payload.email};
});
