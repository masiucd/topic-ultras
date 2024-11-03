import PageWrapper from "@/components/page-wrapper";

import {H1, P} from "@/components/ui/typography";
import {getUserById} from "@/db/dao/user";
import {getSessionId} from "@/lib/auth";
import {redirect} from "next/navigation";
import {ProfileCard} from "./_components/profile-card";

export default async function ProfilePage() {
  let id = await getSessionId();
  if (id === null) {
    redirect("/log-in");
  }
  let user = await getUserById(id);
  if (!user) {
    // TODO
    return <h1>No user !!!!</h1>;
  }

  console.log("user", user);

  return (
    <PageWrapper>
      <H1>Profile</H1>
      <P>Profile page</P>

      <div className="flex bg-red-300">
        <ProfileCard user={user} />
      </div>
    </PageWrapper>
  );
}
