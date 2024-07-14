import {cookies} from "next/headers";

import {ActiveLink} from "@/shared/components/active-link";
import {Link} from "@/shared/components/link";
import {NavIcon} from "@/shared/components/nav-icon";
import {Tooltip} from "@/shared/components/tooltip";
import {H3} from "@/shared/components/typography";
import {siteData} from "@/site-data";

import {ToggleTheme} from "./toggle-theme";

export function MainHeader() {
  let cookieStore = cookies();
  let storedTheme = cookieStore.get("theme");
  return (
    <header className="sm:ml-56">
      <div className="flex items-center justify-between sm:hidden">
        <Link href="/" color="gray" underline="none">
          <H3
            className="uppercase transition-opacity duration-150 hover:opacity-50"
            size="5"
          >
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
                  <ActiveLink color="gray" href={l.href} weight="medium">
                    <Tooltip content={l.text}>
                      <NavIcon href={l.href} />
                    </Tooltip>
                  </ActiveLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
