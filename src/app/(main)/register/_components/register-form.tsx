"use client";
import {register} from "@/app/actions";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {H3, Label} from "@/components/ui/typography";
import {cn} from "@/lib/utils";
import {useActionState} from "react";

export function RegisterForm() {
  let [state, action, pending] = useActionState(register, null);
  console.log("error", state?.error, state?.error?.get("password"));
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
        <Label htmlFor="username">
          <span>Username</span>
          <Input
            type="text"
            id="username"
            name="username"
            defaultValue={state?.values.username}
            required
          />
          <span className="text-red-500">
            {state?.error?.get("username")?.message}
          </span>
        </Label>
        <Label htmlFor="email">
          <span>Email</span>
          <Input
            type="email"
            id="email"
            name="email"
            defaultValue={state?.values.email}
            required
          />
          <span className="text-red-500">
            {state?.error?.get("email")?.message}
          </span>
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
          <span className="text-red-500">
            {state?.error?.get("password")?.message}
          </span>
        </Label>
        <Label htmlFor="confirmPassword">
          <span>Confirm Password</span>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            defaultValue={state?.values.confirmPassword}
            required
          />
          <span className="text-red-500">
            {state?.error?.get("confirmPassword")?.message}
          </span>
        </Label>
        <Button type="submit">Register</Button>
      </fieldset>
    </form>
  );
}
