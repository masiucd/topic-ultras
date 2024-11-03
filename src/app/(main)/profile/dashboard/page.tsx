import PageWrapper from "@/components/page-wrapper";
import {H1} from "@/components/ui/typography";

// Protected route
export default async function DashboardPage() {
  return (
    <PageWrapper>
      <H1>Dashboard</H1>
      <p>Dashboard page</p>
    </PageWrapper>
  );
}
