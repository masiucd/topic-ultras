import {Outlet} from "react-router";
import {Strong} from "~/components/ui/typography";

export default function MainLayout() {
  return (
    <>
      <header>
        <div className="h-[8rem] border border-red-500">
          <Strong>Nutri Check</Strong>
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
