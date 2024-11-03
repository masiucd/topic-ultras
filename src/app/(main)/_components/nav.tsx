import {signOut} from "@/app/actions";
import {getSessionId} from "@/lib/auth";
import {ActiveLink} from "./active-link";

export default async function Nav() {
  let loggedIn = await getSessionId();
  return (
    <nav className="flex-1">
      <ul className="flex justify-end gap-2 bg-blue-100 ">
        <li>
          <ActiveLink href="/food-items">Food-items</ActiveLink>
        </li>
        {loggedIn && (
          <>
            <li>
              <ActiveLink href="/profile">Profile</ActiveLink>
            </li>
            <li>
              <form action={signOut}>
                <button
                  className="font-semibold text-sm hover:opacity-45"
                  type="submit"
                >
                  Sign out
                </button>
              </form>
            </li>
          </>
        )}
        {!loggedIn && (
          <>
            {" "}
            <li>
              <ActiveLink href="/log-in">Log in</ActiveLink>
            </li>
            <li>
              <ActiveLink href="/register">Register</ActiveLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
