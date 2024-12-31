import {Outlet, redirect} from "react-router";
import {getUserById} from "~/.server/db/dao/users";

import {getSession} from "~/.server/sessions";
import PageWrapper from "~/components/page-wrapper";
import {H1} from "~/components/ui/typography";
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
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione unde
      neque velit eos eveniet suscipit vel impedit, dolorem asperiores
      voluptatem dolor, aliquid, omnis expedita aspernatur exercitationem itaque
      tenetur quae? Pariatur.
      <H1>Welcome {user.email}</H1>
      <Outlet context={user} />
    </PageWrapper>
  );
}
