import "server-only";
import env from "@/env";
import {addHours} from "date-fns";
import {SignJWT, jwtVerify} from "jose";
import {z} from "zod";

const KEY = new TextEncoder().encode(env.JWT_SECRET);
const ALGORITHM = "HS256";

let payloadSchema = z.object({
	id: z.number(),
	email: z.string().email(),
	expireDate: z.date().optional(),
});
type Payload = z.infer<typeof payloadSchema>;

export async function encrypt(payload: Payload) {
	let expireDate = addHours(Date.now(), 2);
	let result = payloadSchema.safeParse({...payload, expireDate});
	if (!result.success) {
		return null;
	}
	try {
		return await new SignJWT(payload)
			.setProtectedHeader({alg: ALGORITHM})
			.setIssuedAt()
			.setExpirationTime(expireDate)
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
