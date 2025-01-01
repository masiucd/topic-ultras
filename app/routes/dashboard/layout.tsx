import {Outlet, redirect} from "react-router";
import {getUserById} from "~/.server/db/dao/users";

import {getSession} from "~/.server/sessions";
import PageWrapper from "~/components/page-wrapper";
import {H1, Lead} from "~/components/ui/typography";
import type {Route} from "./+types/layout";

export function meta() {
  return [{title: "Dashboard"}];
}

export async function loader({request}: Route.LoaderArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  if (!userId) {
    return redirect("/login");
  }
  let user = await getUserById(Number.parseInt(userId, 10));
  if (user === null) {
    return redirect("/login");
  }
  return {user};
}

export default function DashboardLayout({loaderData}: Route.ComponentProps) {
  let {user} = loaderData;
  return (
    <PageWrapper>
      <aside>
        <Title user={user} />
        <Lead>Here you can manage your account settings</Lead>
      </aside>
      <Outlet context={user} />
    </PageWrapper>
  );
}

function Title({
  user,
}: {
  user: NonNullable<Awaited<ReturnType<typeof getUserById>>>;
}) {
  if (user.firstName && user.lastName) {
    return (
      <H1>
        Welcome {user.firstName} {user.lastName}
      </H1>
    );
  }
  if (user.firstName) {
    return <H1>Welcome {user.firstName}</H1>;
  }
  return <H1>Welcome {user.email}</H1>;
}
