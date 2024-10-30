import "server-only";
import {compare, genSalt, hash} from "bcrypt";

export async function hashPassword(password: string, saltRounds = 8) {
  try {
    let salt = await genSalt(saltRounds);
    return await hash(password, salt);
  } catch (error) {
    console.error("Error hashing password:", error);
    return null;
  }
}

export async function verifyPassword(password: string, hash: string) {
  try {
    return await compare(password, hash);
  } catch (error) {
    console.error("Error verifying password:", error);
    return false;
  }
}
