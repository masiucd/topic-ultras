import {cookies} from "next/headers";
import Link from "next/link";

import {Tooltip} from "@/_components/ui/tooltip";
import {H3} from "@/_components/ui/typography";
import {siteData} from "@/site-data";

import {ToggleTheme} from "./toggle-theme";

export function MainHeader() {
  let cookieStore = cookies();
  let storedTheme = cookieStore.get("theme");
  return (
    <header className="sm:ml-56">
      <div className="flex items-center justify-between sm:hidden">
        <Link href="/" color="gray">
          <H3 className="uppercase transition-opacity duration-150 hover:opacity-50">
            {siteData.title}
          </H3>
        </Link>
        <div className="flex gap-4 sm:hidden">
          <ToggleTheme
            theme={storedTheme?.value === "dark" ? "dark" : "light"}
          />
          <nav className="py-2 pr-1">
            <ul className="flex gap-4">
              {siteData.navLinks.map((l) => (
                <li key={l.href}>
                  <Link color="gray" href={l.href}>
                    {/* <Tooltip */}

                    {/* // content={l.text} */}
                    {/* > */}
                    {/* <NavIcon href={l.href} /> */}
                    <p>icon</p>
                    {/* </Tooltip> */}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
