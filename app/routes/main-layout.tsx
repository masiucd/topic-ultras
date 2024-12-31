import {Form, Link, Outlet} from "react-router";
import {getUserById} from "~/.server/db/dao/users";

import {getSession} from "~/.server/sessions";
import {Button} from "~/components/ui/button";
import {Strong} from "~/components/ui/typography";
import type {Route} from "./+types/main-layout";

export async function loader({request}: Route.LoaderArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  if (userId) {
    let user = await getUserById(Number.parseInt(userId));
    return {isLoggedIn: !!user};
  }
  return {isLoggedIn: false};
}

export default function MainLayout({loaderData}: Route.ComponentProps) {
  let {isLoggedIn} = loaderData;

  return (
    <>
      <header>
        <div className="h-[8rem] border border-red-500">
          <Link to="/">
            <Strong>Nutri Check</Strong>
          </Link>
          <nav>
            <ul className="flex gap-2">
              <li>
                <Link to="/food-items">food-items</Link>
              </li>
              {!isLoggedIn ? (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Form method="post" action="/logout">
                      <Button type="submit">Logout</Button>
                    </Form>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <main className="min-h-[calc(100dvh-16rem)] ">
        <Outlet />
      </main>
      <footer>
        <div className="h-[8rem] border border-red-500">
          <Strong>Footer</Strong>
        </div>
      </footer>
    </>
  );
}
