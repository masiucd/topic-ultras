import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
	return (
		<div>
			<h1>Register</h1>
			<p>Log in for Nutri Check</p>
			<div>
				<form action="">
					<fieldset>
						<legend>Log in</legend>
						<div>
							<label htmlFor="email">Email</label>
							<input type="email" id="email" name="email" />
						</div>
						<div>
							<label htmlFor="password">Password</label>
							<input type="password" id="password" name="password" />
						</div>

						<Button type="submit">Login</Button>
					</fieldset>
				</form>
				<small>
					Don't have an account? <Link href="/register">Register</Link>
				</small>
				<small>
					<Link href="/forgot-password">Forgot password?</Link>
				</small>
			</div>
		</div>
	);
}
