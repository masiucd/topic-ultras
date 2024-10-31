import PageWrapper from "@/components/page-wrapper";
import {H1} from "@/components/ui/typography";
import {getUserByEmail} from "@/db/dao/user";
import {decrypt} from "@/lib/jwt";

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

// Protected route

async function isLoggedIn() {
  let cookieStore = await cookies();
  let session = cookieStore.get("session");
  if (!session) {
    return false;
  }
  // Decrypt session
  let decrypted = await decrypt(session.value);
  if (decrypted === null) {
    return false;
  }
  // TODO using redis somehow
  let user = await getUserByEmail(decrypted.email);
  if (user === null) {
    return false;
  }

  return true;
}

export default async function DashboardPage() {
  let loggedIn = await isLoggedIn();
  if (loggedIn) {
    redirect("/log-in");
  }
  return (
    <PageWrapper>
      <H1>Dashboard</H1>
      <p>Dashboard page</p>
    </PageWrapper>
  );
}
