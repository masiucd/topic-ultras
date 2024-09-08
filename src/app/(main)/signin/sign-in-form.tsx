"use client";
import {Flex} from "@radix-ui/themes";
import {type ReactNode, useRef} from "react";
import {useFormState} from "react-dom";

import {Label, Span} from "@/components/typography";
import {Callout} from "@/components/ui/callout";
import {Input} from "@/components/ui/input";
import {SubmitButton} from "@/components/ui/submit-button";

import {signin} from "./actions";

export function SignInForm({children}: {children?: ReactNode}) {
	let [state, action] = useFormState(signin, null);
	let ref = useRef<null | HTMLInputElement>(null);
	return (
		<>
			<Flex direction="column" gap="3">
				<Flex
					asChild
					width="100%"
					direction="column"
					px="3"
					py="6"
					gap="3"
					className="rounded-md border border-gray-900/10 shadow-md"
				>
					<form action={action}>
						<label htmlFor="email">
							<Label weight="medium">Email</Label>
							<Input size="3" type="email" id="email" required name="email" />
						</label>
						<label htmlFor="password">
							<Label weight="medium">Password</Label>
							<Input size="3" type="password" required name="password" ref={ref} />
						</label>
						<SubmitButton>
							<Span weight="medium" size="3">
								Sign in
							</Span>
						</SubmitButton>
					</form>
				</Flex>
				{children}
			</Flex>
			<Flex direction="column" minHeight="100px">
				{state && !state.ok && (
					<Callout type="error">
						<Span size="2">Invalid email or password</Span>
					</Callout>
				)}
			</Flex>
		</>
	);
}
