import "server-only";

// import {Effect} from "effect";
import {cookies} from "next/headers";

import {decrypt} from "@/lib/crypto";

// TODO use Effect
export type User = NonNullable<Awaited<ReturnType<typeof isAuthorized>>>;
export async function isAuthorized() {
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
}
