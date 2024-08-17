import "server-only";

import {cookies} from "next/headers";

export function setCookie(key: string, value: string, expiresInHours = 2) {
  let cookieStorage = cookies();
  cookieStorage.set(key, value, {
    secure: true,
    httpOnly: true,
    expires: getExpiresInHours(expiresInHours),
  });
}

export function getExpiresInHours(hours = 2) {
  if (hours < 1) {
    return Date.now() + 1000 * 60 * 60 * 2;
  }
  return Date.now() + 1000 * 60 * 60 * hours;
}
