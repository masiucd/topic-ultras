import PageWrapper from "@/components/page-wrapper";
import {H1} from "@/components/ui/typography";
import {getSessionId} from "@/lib/auth";
import {redirect} from "next/navigation";

// Protected route
export default async function DashboardPage() {
  let user = await getSessionId();
  if (user === null) {
    redirect("/log-in");
  }
  return (
    <PageWrapper>
      <H1>Dashboard</H1>
      <p>Dashboard page</p>
    </PageWrapper>
  );
}
