import {Flex} from "@radix-ui/themes";
import {cookies} from "next/headers";

import {ActiveLink} from "@/shared/components/active-link";
import {Link} from "@/shared/components/link";
import {H3} from "@/shared/components/typography";
import {siteData} from "@/site-data";

import {ToggleTheme} from "./toggle-theme";

export function MainHeader() {
  let cookieStore = cookies();
  let storedTheme = cookieStore.get("theme");
  return (
    <header className="sm:ml-96">
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
          <nav>
            <ul className="flex gap-2">
              {siteData.navLinks.map((l) => (
                <li key={l.href}>
                  <ActiveLink color="gray" href={l.href} weight="medium">
                    {l.text}
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
