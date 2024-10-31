import PageWrapper from "@/components/page-wrapper";
import {H1} from "@/components/ui/typography";
import {isLoggedIn} from "@/lib/auth";
import {redirect} from "next/navigation";

// Protected route
export default async function DashboardPage() {
  let loggedIn = await isLoggedIn();
  if (!loggedIn) {
    redirect("/log-in");
  }
  return (
    <PageWrapper>
      <H1>Dashboard</H1>
      <p>Dashboard page</p>
    </PageWrapper>
  );
}
