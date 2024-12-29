import {Outlet, redirect} from "react-router";
import {authSessionV2} from "~/.server/sessions";
import PageWrapper from "~/components/page-wrapper";
import type {Route} from "./+types";

export function meta() {
  return [{title: "Dashboard"}];
}

export async function loader({request}: Route.LoaderArgs) {
  let auth = await authSessionV2(request);
  if (!auth) {
    return redirect("/login");
  }
}

export default function DashboardLayout() {
  return (
    <PageWrapper>
      <Outlet />
    </PageWrapper>
  );
}
