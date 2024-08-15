import {Button, Flex} from "@radix-ui/themes";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

import PageWrapper from "@/components/page-wrapper";
import {Input} from "@/components/ui/input";
import {getUserByEmail} from "@/db/dao/user";
import {encrypt} from "@/lib/crypto";
import {verifyPassword} from "@/lib/password";

async function login(data: FormData) {
  "use server";
  let email = data.get("email");
  let password = data.get("password");
  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Invalid email or password");
  }
  let user = await getUserByEmail(email);
  if (user === null) {
    return {ok: false};
    // throw new Error("Wrong email or password");
  }
  let isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    return {ok: false};
  }
  let cookieStorage = cookies();
  cookieStorage.set(
    "session",
    await encrypt({
      id: user.id,
      email: user.email,
      expires: Date.now() + 1000 * 60 * 60 * 2, // 2 hours
    })
  );
  redirect("/user/profile");
}

export default function LoginPage() {
  return (
    <PageWrapper>
      <Flex asChild direction="column" maxWidth="500px">
        <form action={login}>
          <label htmlFor="email">
            <span>Email</span>
            <Input type="email" id="email" required name="email" />
          </label>
          <label htmlFor="password">
            <span>Password</span>
            <Input type="password" required name="password" />
          </label>
          <Button type="submit" variant="soft">
            Log in
          </Button>
        </form>
      </Flex>
    </PageWrapper>
  );
}
