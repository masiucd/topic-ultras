import {env} from "$/env";
import {addHours} from "date-fns";
import {SignJWT, jwtVerify} from "jose";
import {z} from "zod";

const KEY = new TextEncoder().encode(env.EMAIL_TOKEN_SECRET);
const ALG = "HS256" as const;

export async function encrypt(email: string, expirationTime = getExpires()) {
  let jwt = new SignJWT({email});
  jwt.setProtectedHeader({alg: ALG});
  jwt.setIssuedAt();
  jwt.setExpirationTime(expirationTime);
  return jwt.sign(KEY);
}

let DecryptSchema = z.object({
  email: z.string(),
  iat: z.number(),
  exp: z.number(),
});
export async function decrypt(token: string) {
  try {
    let jwt = await jwtVerify(token, KEY, {
      algorithms: [ALG],
    });
    return DecryptSchema.parse(jwt.payload);
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

export function getExpires(amountOfHours = 1) {
  let date = new Date();
  return addHours(date, amountOfHours);
}
