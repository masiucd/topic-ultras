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
    <header>
      <Flex
        align="center"
        justify="between"
        className="mx-auto h-20 w-full max-w-6xl border-4"
      >
        <Link href="/" color="gray" underline="none">
          <H3
            className="uppercase transition-opacity duration-150 hover:opacity-50"
            size="5"
          >
            {siteData.title}
          </H3>
        </Link>
        <Flex gap="4" py="1" px="2">
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
        </Flex>
      </Flex>
    </header>
  );
}
