import PageWrapper from "@/components/page-wrapper";
import {H1, Lead} from "@/components/ui/typography";
import Link from "next/link";
import {LogInForm} from "./_components/log-in-form";

export default function LoginPage() {
	return (
		<PageWrapper>
			<H1>Register</H1>
			<Lead>Log in for Nutri Check</Lead>
			<div>
				<LogInForm />
				<small>
					Don't have an account? <Link href="/register">Register</Link>
				</small>
				<small>
					<Link href="/forgot-password">Forgot password?</Link>
				</small>
			</div>
		</PageWrapper>
	);
}
