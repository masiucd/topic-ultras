import {sql} from "drizzle-orm";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

import {PageWrapper} from "@/_components/page-wrapper";
import {Button} from "@/_components/ui/button";
import {Input} from "@/_components/ui/input";
import {H1, Span} from "@/_components/ui/typography";
import {db} from "@/_db/db";
import {users} from "@/_db/models/schema";
import {verifyPassword} from "@/lib/password";

// Just a prototype[e , real implementation will be done later
async function login(data: FormData) {
  "use server";
  let email = data.get("email");
  let password = data.get("password");
  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Something is wrong");
  }

  let userInDb = await db
    .select({
      id: users.id,
      email: users.email,
      password: users.password,
      admin: users.admin,
    })
    .from(users)
    .where(sql`users.email = ${email} and users.password = ${password}`)
    .get();
  if (!userInDb) {
    console.log("User does not exist");
    return;
  }

  // TODO verify password
  let passwordVerified = await verifyPassword(password, userInDb.password);
  if (!passwordVerified) {
    console.log("Password is wrong");
    return;
  }

  console.log("user exists");
  let cookieStore = cookies();
  cookieStore.set(
    "user",
    JSON.stringify({
      ...userInDb,
      admin: userInDb.admin === "1",
      token: "FakeToken", // TODO
    }),
    {
      secure: true,
    },
  );
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
