"use server";
import "server-only";
import {db} from "@/db";
import {users} from "@/db/schema";
import {formatErrors, formatZodErrors} from "@/lib/helpers";
import {hashPassword} from "@/lib/password";
import {eq} from "drizzle-orm";
import {redirect} from "next/navigation";
import {z} from "zod";

let registerSchema = z.object({
	username: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(6),
	confirmPassword: z.string().min(6),
});

type ErrosObj = Map<
	string,
	{
		message: string;
	}
>;

type RegisterSchema = z.infer<typeof registerSchema>;
type PrevState = {
	values: RegisterSchema;
	error: ErrosObj | null;
};

let RegisterInputNames = Object.freeze({
	username: "username",
	email: "email",
	password: "password",
	confirmPassword: "confirmPassword",
});

export async function register(
	_prevState: PrevState | null,
	data: FormData,
): Promise<PrevState> {
	let formValues = Object.fromEntries(data);
	let validatedData = registerSchema.safeParse(formValues);
	if (!validatedData.success) {
		return {
			values: {
				[RegisterInputNames.username]: (formValues.username as string) ?? "",
				[RegisterInputNames.email]: (formValues.email as string) ?? "",
				[RegisterInputNames.password]: (formValues.password as string) ?? "",
				[RegisterInputNames.confirmPassword]:
					(formValues.confirmPassword as string) ?? "",
			},
			error: formatZodErrors(validatedData.error.errors),
		};
	}
	let {username, email, password, confirmPassword} = validatedData.data;

	if (password !== confirmPassword) {
		return {
			values: {
				username,
				email,
				password,
				confirmPassword,
			},
			error: formatErrors([
				{
					message: "Password does not match",
					name: RegisterInputNames.password,
				},
				{
					message: "Password does not match",
					name: RegisterInputNames.confirmPassword,
				},
			]),
		};
	}

	// Check so that email is not already in use
	let user = await db.select().from(users).where(eq(users.email, email));
	if (user.length > 0) {
		return {
			values: {username, email, password, confirmPassword},
			error: formatErrors([
				{
					message: "Email is already in use",
					name: "invalid-input",
				},
			]),
		};
	}

	// Hash password
	let hashedPassword = await hashPassword(password);
	if (!hashedPassword) {
		return {
			values: {username, email, password, confirmPassword},
			error: formatErrors([
				{
					message: "Error when signing up",
					name: "invalid-input",
				},
			]),
		};
	}
	await db.insert(users).values({
		username,
		email,
		password: hashedPassword,
	});
	redirect("/log-in");
}
