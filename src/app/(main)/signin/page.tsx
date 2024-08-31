import {Flex} from "@radix-ui/themes";
import {redirect} from "next/navigation";

import PageWrapper from "@/components/page-wrapper";
import {H1, Lead} from "@/components/typography";
import {isAuthorized} from "@/lib/auth";

import {SignInForm} from "./sign-in-form";

// TODO add session to the sessions table
export default async function SignInPage() {
  let payload = await isAuthorized();
  if (payload !== null) {
    redirect("/user/profile");
  }

  return (
    <PageWrapper className="items-center justify-center ">
      <Flex direction="column" gap="2" mb="5" align="center">
        <H1>Welcome Back</H1>
        <Lead size="4">Enter your email and password to sign in</Lead>
      </Flex>
      <SignInForm />
    </PageWrapper>
  );
}
