"use client";
import {Flex} from "@radix-ui/themes";
import {useFormState} from "react-dom";

import {Label, Span} from "@/components/typography";
import {Input} from "@/components/ui/input";
import {SubmitButton} from "@/components/ui/submit-button";

import {login} from "./actions";

export function SignInForm() {
  let [state, action] = useFormState(login, null);
  return (
    <Flex>
      <Flex
        asChild
        direction="column"
        maxWidth="500px"
        width="100%"
        p="3"
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
            <Input size="3" type="password" required name="password" />
          </label>
          <SubmitButton>
            <Span weight="medium" size="3">
              Sign in
            </Span>
          </SubmitButton>
        </form>
      </Flex>
      {/* TODO Use Callout */}
      {state !== null && state.message}
    </Flex>
  );
}
