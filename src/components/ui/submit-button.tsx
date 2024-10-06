"use client";
import {cn} from "@/lib/utils/cn";
import type {ComponentProps} from "react";
import {useFormStatus} from "react-dom";

/**
 * SubmitButton component
 *
 * A customizable button component for form submission that automatically
 * handles pending state.
 *
 * @param {ComponentProps<"button">} props - Props to be spread onto the button element
 * @returns {JSX.Element} A button element with pending state handling
 *
 * @example
 * <SubmitButton className="my-custom-class">Submit</SubmitButton>
 */
export function SubmitButton(props: ComponentProps<"button">) {
  let {pending} = useFormStatus();
  return (
    <button
      disabled={pending}
      aria-disabled={pending}
      className={cn("", pending && "opacity-35")}
      {...props}
      type="submit"
    />
  );
}
