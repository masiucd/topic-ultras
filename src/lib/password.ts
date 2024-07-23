import "server-only";

import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  let salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}
