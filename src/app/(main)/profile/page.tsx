import {PageWrapper} from "@/_components/page-wrapper";
import {H1} from "@/_components/ui/typography";

// TODO protected route
// if not logged in then redirect to login

export default async function ProfilePage() {
  return (
    <PageWrapper>
      <H1>Welcome User</H1>
    </PageWrapper>
  );
}
