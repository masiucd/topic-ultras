import "server-only";

import {addHours} from "date-fns";
import {type JWTPayload, SignJWT, jwtVerify} from "jose";
import {z} from "zod";

import env from "@/env";

const algorithm = "HS256";
let key = new TextEncoder().encode(env.JWT_SECRET);

let payloadSchema = z.object({
	id: z.number(),
	email: z.string(),
	// expires: z.number(),
	iat: z.number().optional(),
	exp: z.number().optional(),
});
export type Payload = z.infer<typeof payloadSchema>;

export async function encrypt(payload: JWTPayload) {
	return await new SignJWT(payload)
		.setProtectedHeader({alg: algorithm})
		.setIssuedAt()
		.setExpirationTime(payload.exp ?? addHours(Date.now(), 2)) // 2 hours)
		.sign(key);
}

export async function decrypt(encrypted: string) {
	let {payload} = await jwtVerify(encrypted, key, {algorithms: [algorithm]});
	let result = payloadSchema.safeParse(payload);
	if (result.success) {
		return result.data;
	}
	return null;
}
