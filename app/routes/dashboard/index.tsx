import {Link, useOutletContext} from "react-router";
import type {getUserById} from "~/.server/db/dao/users";
import {H2, List} from "~/components/ui/typography";

export default function DashboardRoute() {
  let ctx =
    useOutletContext<NonNullable<Awaited<ReturnType<typeof getUserById>>>>();
  return (
    <div>
      <H2>Dashboard</H2>

      <List>
        <li>
          <Link
            className="underline underline-offset-2 hover:opacity-60"
            to="/dashboard/settings"
          >
            Edit Profile
          </Link>
        </li>
        <li>
          <Link
            className="underline underline-offset-2 hover:opacity-60"
            to="/dashboard/favorites"
          >
            Favorite foods
          </Link>
        </li>
        <li>
          <Link
            className="underline underline-offset-2 hover:opacity-60"
            to="/dashboard/foods"
          >
            Foods
          </Link>
        </li>
      </List>
    </div>
  );
}
