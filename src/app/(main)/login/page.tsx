import {Button, Flex} from "@radix-ui/themes";
import {eq} from "drizzle-orm";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

import PageWrapper from "@/components/page-wrapper";
import {Input} from "@/components/ui/input";
import {db} from "@/db";
import {users} from "@/db/schema";
import {verifyPassword} from "@/lib/password";

async function getUserByEmail(email: string) {
  try {
    let user = await db
      .select({id: users.id, email: users.email, password: users.password})
      .from(users)
      .where(eq(users.email, email));
    if (user.length > 0) {
      return user[0];
    }
    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
}

async function login(data: FormData) {
  "use server";
  let email = data.get("email");
  let password = data.get("password");
  console.log({email, password});
  if (typeof email !== "string" || typeof password !== "string") {
    // throw new Error("This should never happened!!");
    return;
  }
  let user = await getUserByEmail(email);
  if (user === null) {
    return;
    // throw new Error("Wrong email or password");
  }
  let isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    return;
    // throw new Error("Wrong email or password");
  }

  let cookieStorage = cookies();
  // cookieStorage.set('session',)

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
