"use client";

import {cn} from "@/lib/utils";
import type {ComponentProps, PropsWithChildren} from "react";
import {useFormStatus} from "react-dom";
import {Button, type ButtonVariants} from "./ui/button";

type Props = {
  variant?: ButtonVariants;
};

export function SubmitButton(
  props: PropsWithChildren<ComponentProps<"button"> & Props>
) {
  let {pending} = useFormStatus();
  return (
    <Button
      aria-disabled={pending}
      aria-label="Submit"
      aria-description="Submit the form"
      type="submit"
      className={cn(
        "relative active:top-1",
        pending && "cursor-not-allowed opacity-50"
      )}
      {...props}
    >
      {props.children}
    </Button>
  );
}
