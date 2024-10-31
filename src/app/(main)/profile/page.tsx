import PageWrapper from "@/components/page-wrapper";
import {isLoggedIn} from "@/lib/auth";
import {redirect} from "next/navigation";

export default async function ProfilePage() {
  let loggedIn = await isLoggedIn();
  if (!loggedIn) {
    redirect("/log-in");
  }
  return (
    <PageWrapper>
      <h1>Profile</h1>
      <p>Profile page</p>
    </PageWrapper>
  );
}
