import Link from "next/link";

export default function RegisterPage() {
	return (
		<div>
			<h1>Register</h1>
			<p>Register for Nutri Check</p>
			<div>
				<form action="">
					<fieldset>
						<legend>
							<h2>Register</h2>
						</legend>
						<label htmlFor="username">Username</label>
						<input type="text" id="username" name="username" />
						<label htmlFor="password">Password</label>
						<input type="password" id="password" name="password" />
						<label htmlFor="confirmPassword">Confirm Password</label>
						<input type="password" id="confirmPassword" name="confirmPassword" />
						<button type="submit">Register</button>
					</fieldset>
				</form>
				<small>
					Already have an account? <Link href="/log-in">Log in</Link>
				</small>
			</div>
		</div>
	);
}
