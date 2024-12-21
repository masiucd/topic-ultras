import {createHash, timingSafeEqual} from "node:crypto";

export async function hashPassword(password: string): Promise<string> {
  const hash = createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  const passwordHash = createHash("sha256");
  passwordHash.update(password);
  const passwordDigest = passwordHash.digest();

  const hashBuffer = Buffer.from(hash, "hex");
  return timingSafeEqual(passwordDigest, hashBuffer);
}
