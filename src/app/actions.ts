"use server";
import "server-only";
import {db} from "@/db";
import {getUserByEmail} from "@/db/dao/user";
import {users} from "@/db/schema";
import {formatErrors, formatZodErrors} from "@/lib/helpers";
import {encrypt} from "@/lib/jwt";
import {hashPassword, verifyPassword} from "@/lib/password";
import {cookies} from "next/headers";
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
type RegisterPrevState = {
	values: RegisterSchema;
	error: ErrosObj | null;
};

let RegisterInputNames = Object.freeze({
	username: "username",
	email: "email",
	password: "password",
	confirmPassword: "confirmPassword",
});

export async function register(_prevState: RegisterPrevState | null, data: FormData) {
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

	let user = await getUserByEmail(email);
	if (user === null) {
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

let loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

type LoginSchema = z.infer<typeof loginSchema>;
type LoginPrevState = {
	values: LoginSchema;
	error: ErrosObj | null;
};

export async function logIn(_prevState: LoginPrevState | null, data: FormData) {
	let formValues = Object.fromEntries(data);
	let validatedData = loginSchema.safeParse(formValues);
	if (!validatedData.success) {
		return {
			values: {
				email: (formValues.email as string) ?? "",
				password: (formValues.password as string) ?? "",
			},
			error: formatZodErrors(validatedData.error.errors),
		};
	}
	let {email, password} = validatedData.data;
	let user = await getUserByEmail(email);
	if (user === null) {
		return {
			values: {email, password},
			error: formatErrors([
				{
					message: "Invalid email or password",
					name: "invalid-input",
				},
			]),
		};
	}
	let validPassword = await verifyPassword(password, user.password);
	if (!validPassword) {
		return {
			values: {email, password},
			error: formatErrors([
				{
					message: "Invalid email or password",
					name: "invalid-input",
				},
			]),
		};
	}

	// Set session
	let cookieStore = await cookies();
	let token = await encrypt({id: user.id, email: user.email});
	if (token !== null) {
		cookieStore.set("session", token);
		redirect("/profile/dashboard");
	}
	return {
		values: {email, password},
		error: formatErrors([
			{
				message: "Error when signing in",
				name: "invalid-input",
			},
		]),
	};
}

export async function signOut() {
	let cookieStore = await cookies();
	cookieStore.delete("session");
	redirect("/log-in");
}
