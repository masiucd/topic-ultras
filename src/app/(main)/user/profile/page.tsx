import PageWrapper from "@/components/page-wrapper";
import {H1, P} from "@/components/typography";
import {getUserFromSession} from "@/lib/auth";

export default async function UserProfilePage() {
  let user = await getUserFromSession();
  if (!user) {
    return null;
  }

  return (
    <PageWrapper>
      <H1>
        Welcome {user.firstName} {user.lastName}
      </H1>
      <P>Email: {user.email}</P>
      <P>Age: {user.age}</P>
      <P>Admin: {user.admin ? "Yes" : "No"}</P>
    </PageWrapper>
  );
}
