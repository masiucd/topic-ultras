import "server-only";

import {jwtVerify, SignJWT} from "jose";
import {z} from "zod";

import env from "@/env";

const algorithm = "HS256";
let key = new TextEncoder().encode(env.JWT_SECRET);

let payloadSchema = z.object({
  id: z.number(),
  email: z.string(),
  expires: z.number(),
  iat: z.number().optional(),
  exp: z.number().optional(),
});
type Payload = z.infer<typeof payloadSchema>;

export async function encrypt(payload: Payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({alg: algorithm})
    .setIssuedAt()
    .setExpirationTime(payload.expires)
    .sign(key);
}

export async function decrypt(encrypted: string) {
  let {payload} = await jwtVerify(encrypted, key, {algorithms: [algorithm]});
  return payloadSchema.parse(payload);
}
