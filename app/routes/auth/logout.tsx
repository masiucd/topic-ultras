import {redirect} from "react-router";
import {authSessionV2} from "~/.server/sessions";
import type {Route} from "./+types/logout";

export async function action({request}: Route.ActionArgs) {
  let auth = await authSessionV2(request);
  if (!auth) throw new Error("No session found");
  return redirect("/login", {
    headers: {
      "Set-Cookie": await auth.destroy(),
    },
  });
}

export async function loader() {
  return redirect("/login");
}

export default function Logout() {
  return null;
}
