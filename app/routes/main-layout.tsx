import {Link, Outlet} from "react-router";
import {Strong} from "~/components/ui/typography";

export default function MainLayout() {
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
              <li>
                <Link to="/auth/login">Login</Link>
              </li>
              <li>
                <Link to="/auth/register">Register</Link>
              </li>
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
