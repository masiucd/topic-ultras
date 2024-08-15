import "server-only";

import {compare, genSalt, hash} from "bcrypt";

export async function hashPassword(password: string) {
  let salt = await genSalt(10);
  return await hash(password, salt);
}

export async function verifyPassword(password: string, encrypted: string) {
  return await compare(password, encrypted);
}
