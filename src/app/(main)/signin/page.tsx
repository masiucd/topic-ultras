import {Flex} from "@radix-ui/themes";
import {redirect} from "next/navigation";

import PageWrapper from "@/components/page-wrapper";
import {H1, Label, Lead, Span} from "@/components/typography";
import {isAuthorized} from "@/lib/auth";

import Link from "next/link";
import {SignInForm} from "./sign-in-form";

export default async function SignInPage() {
	let payload = await isAuthorized();
	if (payload !== null) {
		redirect("/user/profile");
	}

	return (
		<PageWrapper className="items-center justify-center ">
			<Flex direction="column" gap="2" mb="5" align="center">
				<H1>Welcome Back</H1>
				<Lead size="4">Enter your email and password to sign in</Lead>
			</Flex>
			<Flex maxWidth="500px" width="100%" direction="column" gap="3">
				<SignInForm>
					<Label asChild>
						<small>
							Forget your password?{" "}
							<Link href="/forgot-password">
								<Span className="underline cursor-pointer">Reset it here</Span>
							</Link>
						</small>
					</Label>
				</SignInForm>
			</Flex>
		</PageWrapper>
	);
}
