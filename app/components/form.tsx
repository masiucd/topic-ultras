import type {PropsWithChildren} from "react";
import {cn} from "~/lib/utils";
import {P} from "./ui/typography";

export function ErrorMessage({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return <P className={cn("text-red-500", className)}>{message}</P>;
}

export function FormGroup({
  children,
  className,
}: PropsWithChildren<{className?: string}>) {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
}
