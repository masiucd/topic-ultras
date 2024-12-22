import {hash, verify} from "argon2";

export async function hashPassword(password: string) {
  try {
    return await hash(password);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    return await verify(hash, password);
  } catch (error) {
    console.error(error);
    return false;
  }
}
