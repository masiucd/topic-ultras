"use client";

import {cn} from "@/lib/utils";
import type {ComponentProps, PropsWithChildren} from "react";
import {useFormStatus} from "react-dom";
import {Button} from "./ui/button";

export function SubmitButton(props: PropsWithChildren<ComponentProps<"button">>) {
	let {pending} = useFormStatus();
	return (
		<Button
			aria-disabled={pending}
			aria-label="Submit"
			aria-description="Submit the form"
			type="submit"
			className={cn(pending && "cursor-not-allowed opacity-50")}
			{...props}
		>
			{props.children}
		</Button>
	);
}
