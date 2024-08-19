"use client";
import {Flex} from "@radix-ui/themes";
import {useRef} from "react";
import {useFormState} from "react-dom";

import {Label, Span} from "@/components/typography";
import {Callout} from "@/components/ui/callout";
import {Input} from "@/components/ui/input";
import {SubmitButton} from "@/components/ui/submit-button";

import {login} from "./actions";

export function SignInForm() {
  let [state, action] = useFormState(login, null);
  let ref = useRef<null | HTMLInputElement>(null);
  return (
    <Flex maxWidth="500px" width="100%" direction="column" gap="3">
      <Flex
        asChild
        width="100%"
        direction="column"
        px="3"
        py="6"
        gap="3"
        className="rounded-md border border-gray-900/10 shadow-md"
      >
        <form
          action={(data) => {
            if (ref.current) {
              ref.current.value = "";
            }
            action(data);
          }}
        >
          <label htmlFor="email">
            <Label weight="medium">Email</Label>
            <Input size="3" type="email" id="email" required name="email" />
          </label>
          <label htmlFor="password">
            <Label weight="medium">Password</Label>
            <Input
              size="3"
              type="password"
              required
              name="password"
              ref={ref}
            />
          </label>
          <SubmitButton>
            <Span weight="medium" size="3">
              Sign in
            </Span>
          </SubmitButton>
        </form>
      </Flex>
      <Flex direction="column" minHeight="100px">
        {state !== null && <Callout type="error">{state.message}</Callout>}
      </Flex>
    </Flex>
  );
}
