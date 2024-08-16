import "server-only";

import {cookies} from "next/headers";

export function setCookie(key: string, value: string) {
  let cookieStorage = cookies();
  cookieStorage.set(key, value, {
    secure: true,
    httpOnly: true,
  });
}
