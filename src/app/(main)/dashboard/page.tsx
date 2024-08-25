import Link from "next/link";
import {redirect} from "next/navigation";

import {H1, Span} from "@/components/typography";
import {isAuthorized} from "@/lib/auth";

import {getUserByEmail} from "./dao";

async function getUser() {
  let payload = await isAuthorized();
  if (payload === null) {
    redirect("/signin");
  }
  let user = await getUserByEmail(payload.email);
  if (user === null) {
    redirect("/signin");
  }
  return user;
}

export default async function DashboardPage() {
  let user = await getUser();
  return (
    <>
      <H1 mb="5">
        Welcome back{" "}
        <Span
          className="relative rounded-sm capitalize after:absolute after:bottom-3 after:left-0 after:h-3 after:w-full after:-rotate-3 after:bg-blue-800/55 after:transition-transform after:content-['']"
          weight="medium"
        >
          {user.firstName}
        </Span>{" "}
        <Span
          className="relative rounded-sm capitalize after:absolute after:bottom-5 after:left-0 after:h-4 after:w-full after:rotate-3 after:bg-blue-800/55 after:transition-transform after:content-['']"
          weight="medium"
        >
          {user.lastName}
        </Span>
        !
      </H1>
      {/* <Link href="/dashboard">account</Link> */}
      {/* <Link href="/user/profile/contact">account</Link>
      <Link href="/user/profile/favorites">account</Link> */}
    </>
  );
}
