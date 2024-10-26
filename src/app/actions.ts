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
	values: RegisterSchema;
	error: ReturnType<typeof formatErrors> | null;
};

export async function register(
	_prevState: PrevState | null,
	data: FormData,
): Promise<PrevState> {
	let formValues = Object.fromEntries(data);
	let validatedData = registerSchema.safeParse(formValues);
	if (!validatedData.success) {
		let error = formatErrors(validatedData.error.errors);
		return {
			values: {
				username: (formValues.username as string) ?? "",
				email: (formValues.email as string) ?? "",
				password: (formValues.password as string) ?? "",
				confirmPassword: (formValues.confirmPassword as string) ?? "",
			},
			error,
		};
	}
	let {username, email, password, confirmPassword} = validatedData.data;
	return {
		values: {username, email, password, confirmPassword},
		error: null,
	};
}

/**
 * Formats an array of Zod issues into a Map where the keys are the error paths and the values are objects containing the error message and code.
 *
 * @param errors - An array of Zod issues to format.
 * @returns A Map where each key is an error path and each value is an object containing the error message and code.
 */
function formatErrors(errors: z.ZodIssue[]) {
	let result = new Map<string, {message: string; code: string}>();
	for (let error of errors) {
		let obj = {
			message: error.message.replace("String", error.path[0] as string),
			code: error.code,
		};
		result.set(error.path[0] as string, obj);
	}
	return result;
}
