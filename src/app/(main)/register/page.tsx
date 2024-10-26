import PageWrapper from "@/components/page-wrapper";
import {H1, Lead} from "@/components/ui/typography";
import Link from "next/link";
import {RegisterForm} from "./_components/register-form";

export default function RegisterPage() {
	return (
		<PageWrapper>
			<H1>Register a new account</H1>
			<Lead>Register as a new user for Nutri Check</Lead>
			<div className="mx-auto my-10 w-[45rem]">
				<RegisterForm />
				<small>
					Already have an account? <Link href="/log-in">Log in</Link>
				</small>
			</div>
		</PageWrapper>
	);
}
