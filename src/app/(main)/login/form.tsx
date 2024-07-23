"use client";
import {Button} from "@/_components/ui/button";
import {Input} from "@/_components/ui/input";
import {Span} from "@/_components/ui/typography";

import {login} from "./actions";

export default function Form() {
  return (
    <form action={login}>
      <fieldset className="flex flex-col gap-3">
        <Input placeholder="email" type="email" name="email" required />
        <Input
          placeholder="password"
          type="password"
          name="password"
          required
        />
        <Button type="submit">
          <Span className="font-bold">Login</Span>
        </Button>
      </fieldset>
    </form>
  );
}
