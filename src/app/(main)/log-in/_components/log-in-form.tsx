"use client";
import {logIn} from "@/app/actions";
import {SubmitButton} from "@/components/submit-button";
import {Input} from "@/components/ui/input";
import {H3, Label} from "@/components/ui/typography";
import {cn} from "@/lib/utils";
import {useActionState} from "react";

export function LogInForm() {
  let [state, action, pending] = useActionState(logIn, null);
  let hasSomeError = state?.error;
  return (
    <form action={action}>
      <fieldset
        className={cn(
          "flex flex-col gap-3 rounded-sm border-2 border-foreground p-4",
          pending && "animate-pulse opacity-55"
        )}
      >
        <legend>
          <H3>Account Information</H3>
        </legend>
        <Label htmlFor="email">
          <span>Email</span>
          <Input
            type="email"
            id="email"
            name="email"
            defaultValue={state?.values.email}
            required
          />
          {hasSomeError && (
            <span className="text-red-500">
              {hasSomeError.get("email")?.message}
            </span>
          )}
        </Label>
        <Label htmlFor="password">
          <span>Password</span>
          <Input
            type="password"
            id="password"
            name="password"
            defaultValue={state?.values.password}
            required
          />
          {hasSomeError && (
            <span className="text-red-500">
              {hasSomeError.get("password")?.message}
            </span>
          )}
        </Label>
        <SubmitButton type="submit">Login</SubmitButton>
        {hasSomeError && (
          <span className="text-red-500">
            {hasSomeError.get("invalid-input")?.message}
          </span>
        )}
      </fieldset>
    </form>
  );
}
