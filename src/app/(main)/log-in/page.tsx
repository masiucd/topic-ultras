import PageWrapper from "@/components/page-wrapper";
import {H1, Lead} from "@/components/ui/typography";
import Link from "next/link";
import {LogInForm} from "./_components/log-in-form";

export default function LoginPage() {
  return (
    <PageWrapper>
      <H1>Register</H1>
      <Lead>Log in for Nutri Check</Lead>
      <div className="mx-auto my-10 w-[45rem]">
        <LogInForm />
        <div className="flex flex-col">
          <small>
            Don't have an account?{" "}
            <Link
              className="underline underline-offset-2 hover:opacity-60"
              href="/register"
              aria-description="Register"
            >
              Register
            </Link>
          </small>
          <small>
            <Link
              className="underline underline-offset-2 hover:opacity-60"
              href="/forgot-password"
              aria-description="Forgot password?"
            >
              Forgot password?
            </Link>
          </small>
        </div>
      </div>
    </PageWrapper>
  );
}
