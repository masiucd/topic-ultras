import {redirect} from "next/navigation";

import {PageWrapper} from "@/_components/page-wrapper";
import {Button} from "@/_components/ui/button";
import {Input} from "@/_components/ui/input";
import {H1, Span} from "@/_components/ui/typography";

async function login(data: FormData) {
  "use server";
  let email = data.get("email");
  let password = data.get("password");
  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Something is wrong");
  }

  console.log({email, password});
  // when success
  redirect("/profile");
}

export default function LoginPage() {
  return (
    <PageWrapper>
      <div className="my-5">
        <H1>Login</H1>
      </div>

      <div className="max-w-xl">
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
      </div>
    </PageWrapper>
  );
}
