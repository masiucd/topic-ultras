import {redirect} from "react-router";
import {authSession} from "~/.server/sessions";
import type {Route} from "./+types/logout";

export async function action({request}: Route.ActionArgs) {
  let {getSession, destroySession} = authSession();
  let session = await getSession(request.headers.get("cookie"));
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
