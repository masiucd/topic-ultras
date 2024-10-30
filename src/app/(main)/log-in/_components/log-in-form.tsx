import {SubmitButton} from "@/components/submit-button";
import {cn} from "@/lib/utils";
import {useActionState} from "react";

export function LogInForm() {
	let [state, action, pending] = useActionState(register, null);
	return (
		<form action="">
			<fieldset
				className={cn(
					"flex flex-col gap-3 rounded-sm border-2 border-foreground p-4",
					// pending && "animate-pulse opacity-55"
				)}
			>
				<legend>Log in</legend>
				<div>
					<label htmlFor="email">Email</label>
					<input type="email" id="email" name="email" />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password" id="password" name="password" />
				</div>

				<SubmitButton type="submit">Login</SubmitButton>
			</fieldset>
		</form>
	);
}
