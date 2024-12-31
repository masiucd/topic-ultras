import {redirect} from "react-router";

import {destroySession, getSession} from "~/.server/sessions";
import type {Route} from "./+types/logout";

export async function action({request}: Route.ActionArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  if (!userId) throw new Error("No session found");
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export async function loader() {
  return redirect("/login");
}

export default function Logout() {
  return null;
}
