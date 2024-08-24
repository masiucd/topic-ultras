import Link from "next/link";
import {redirect} from "next/navigation";

import {H1} from "@/components/typography";
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
      <H1>
        Welcome back {user.firstName} {user.lastName}!
      </H1>
      <Link href="/dashboard">account</Link>
      {/* <Link href="/user/profile/contact">account</Link>
      <Link href="/user/profile/favorites">account</Link> */}
    </>
  );
}
