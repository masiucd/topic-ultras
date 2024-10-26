"use server";
import "server-only";
import {z} from "zod";

let registerSchema = z.object({
	username: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(6),
	confirmPassword: z.string().min(6),
});

type RegisterSchema = z.infer<typeof registerSchema>;
type PrevState = {
	message: string;
	values: RegisterSchema;
	errors: z.ZodIssue[];
};

export async function register(
	prevState: PrevState | null,
	data: FormData,
): Promise<PrevState> {
	console.log("prevState", prevState);
	let formValues = Object.fromEntries(data);
	let validatedData = registerSchema.safeParse(formValues);
	if (!validatedData.success) {
		return {
			message: "Invalid form data",
			values: {
				username: (formValues.username as string) ?? "",
				email: (formValues.email as string) ?? "",
				password: (formValues.password as string) ?? "",
				confirmPassword: (formValues.confirmPassword as string) ?? "",
			},
			errors: validatedData.error.errors,
		};
	}
	let {username, email, password, confirmPassword} = validatedData.data;
	console.log({username, email, password, confirmPassword});
	return {
		message: "Registered successfully",
		values: {username, email, password, confirmPassword},
		errors: [],
	};
}
