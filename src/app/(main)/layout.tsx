import {Flex} from "@radix-ui/themes";
import type {ReactNode} from "react";

import {Link} from "@/shared/components/ui/link";
import {H3} from "@/shared/components/ui/typography";
import {siteData} from "@/site-data";

const CURRENT_YEAR = new Date().getFullYear();

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
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
          <nav>
            <ul className="flex gap-2">
              {siteData.navLinks.map((l) => (
                <li key={l.href}>
                  <Link color="gray" href={l.href} weight="medium">
                    {l.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Flex>
      </header>
      <main className="flex min-h-[calc(100dvh-10rem)] flex-col border border-red-600">
        {children}
      </main>
      <footer>
        <Flex className="mx-auto h-20 w-full max-w-6xl border-4">
          <small>
            © {CURRENT_YEAR} {siteData.title}
          </small>
        </Flex>
      </footer>
    </>
  );
}
