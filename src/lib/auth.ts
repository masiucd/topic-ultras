import "server-only";

import {cookies} from "next/headers";
import {cache} from "react";

import {decrypt} from "@/lib/crypto";

export type User = NonNullable<Awaited<ReturnType<typeof isAuthorized>>>;
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
