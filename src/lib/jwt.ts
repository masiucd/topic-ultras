import "server-only";
import env from "@/env";
import {addHours} from "date-fns";
import {type JWTPayload, SignJWT, jwtVerify} from "jose";
import {z} from "zod";

const KEY = new TextEncoder().encode(env.JWT_SECRET);
const ALGORITHM = "HS256";

let payloadSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});

export async function encrypt(payload: JWTPayload) {
  let result = payloadSchema.safeParse(payload);
  if (!result.success) {
    return null;
  }
  try {
    return await new SignJWT(payload)
      .setProtectedHeader({alg: ALGORITHM})
      .setIssuedAt()
      .setExpirationTime(addHours(Date.now(), 2))
      .sign(KEY);
  } catch (error) {
    console.error("Error encrypting payload:", error);
    return null;
  }
}

export async function decrypt(encrypted: string) {
  try {
    let {payload} = await jwtVerify(encrypted, KEY, {algorithms: [ALGORITHM]});
    let result = payloadSchema.safeParse(payload);
    if (result.success) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error("Error decrypting payload:", error);
    return null;
  }
}
