"use client";
import {Button, type ButtonProps} from "@radix-ui/themes";
import {useFormStatus} from "react-dom";

export function SubmitButton(props: ButtonProps) {
  let {pending} = useFormStatus();
  return (
    <Button
      aria-disabled={pending}
      type="submit"
      variant="solid"
      highContrast={!pending}
      size="3"
      disabled={pending}
      {...props}
    />
  );
}
