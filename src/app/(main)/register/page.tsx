import PageWrapper from "@/components/page-wrapper";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {H1, H3, Label, P} from "@/components/ui/typography";
import Link from "next/link";
import {z} from "zod";

let registerSchema = z.object({
	username: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(6),
	confirmPassword: z.string().min(6),
});

async function register(data: FormData) {
	"use server";
	let formValues = Object.fromEntries(data);
	let validatedData = registerSchema.safeParse(formValues);
	if (!validatedData.success) {
		console.error(validatedData.error);
		return null;
	}
	let {username, email, password, confirmPassword} = validatedData.data;
	console.log({username, email, password, confirmPassword});
}

export default function RegisterPage() {
	return (
		<PageWrapper>
			<H1>Register a new account</H1>
			<P>Register as a new user for Nutri Check</P>
			<div className="mx-auto my-10 w-[45rem] ">
				<form action={register}>
					<fieldset className="flex flex-col gap-3 rounded-sm border-2 border-foreground p-4">
						<legend>
							<H3>Account Information</H3>
						</legend>
						<Label htmlFor="username">
							<span>Username</span>
							<Input type="text" id="username" name="username" />
						</Label>
						<Label htmlFor="email">
							<span>Email</span>
							<Input type="email" id="email" name="email" />
						</Label>
						<Label htmlFor="password">
							<span>Password</span>
							<Input type="password" id="password" name="password" />
						</Label>
						<Label htmlFor="confirmPassword">
							<span>Confirm Password</span>
							<Input type="password" id="confirmPassword" name="confirmPassword" />
						</Label>
						<Button type="submit">Register</Button>
					</fieldset>
				</form>
				<small>
					Already have an account? <Link href="/log-in">Log in</Link>
				</small>
			</div>
		</PageWrapper>
	);
}
