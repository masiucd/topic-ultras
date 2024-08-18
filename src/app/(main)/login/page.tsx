import {Button, Flex} from "@radix-ui/themes";
import {redirect} from "next/navigation";

import PageWrapper from "@/components/page-wrapper";
import {H1, Label, Lead, Span} from "@/components/typography";
import {Input} from "@/components/ui/input";
import {getUserFromSession} from "@/lib/auth";

import {login} from "./actions";

async function isLoggedIn() {
  let user = await getUserFromSession();
  if (user !== null) {
    return true;
  }
  return false;
}

export default async function LoginPage() {
  let loggedIn = await isLoggedIn();
  if (loggedIn) {
    redirect("/user/profile");
  }

  return (
    <PageWrapper className="items-center justify-center ">
      <Flex direction="column" gap="2" mb="5" align="center">
        <H1>Welcome Back</H1>
        <Lead size="4">Enter your email and password to sign in</Lead>
      </Flex>
      <Flex
        asChild
        direction="column"
        maxWidth="500px"
        width="100%"
        p="3"
        gap="3"
        className="rounded-md border shadow-md border-gray-900/10"
      >
        <form action={login}>
          <label htmlFor="email">
            <Label weight="medium">Email</Label>
            <Input size="3" type="email" id="email" required name="email" />
          </label>
          <label htmlFor="password">
            <Label weight="medium">Password</Label>
            <Input size="3" type="password" required name="password" />
          </label>
          <Button type="submit" variant="solid" highContrast size="3">
            <Span weight="medium" size="3">
              Sign in
            </Span>
          </Button>
        </form>
      </Flex>
    </PageWrapper>
  );
}
