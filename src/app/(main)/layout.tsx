import {cookies} from "next/headers";
import Link from "next/link";
import type {ReactNode} from "react";

import {Separator} from "@/_components/ui/separator";
import {H3, Muted} from "@/_components/ui/typography";
import {siteData} from "@/site-data";

import {MainFooter} from "../_layout-components/main-footer";
import {MainHeader} from "../_layout-components/main-header";
import {ToggleTheme} from "../_layout-components/toggle-theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  let cookieStore = cookies();
  let storedTheme = cookieStore.get("theme");
  let isDarkTheme = storedTheme?.value === "dark";
  return (
    <>
      <MainHeader />
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-56 flex-col border-r sm:flex">
        <nav className="flex flex-col gap-4 px-2 sm:py-5">
          <Link href="/">
            <H3 className="uppercase">{siteData.title}</H3>
          </Link>
          <ul className="flex flex-col gap-4">
            {siteData.navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <div className="flex gap-2">
                    {/* <NavIcon href={link.href} /> */}
                    <Muted>{link.text}</Muted>
                  </div>
                </Link>
              </li>
            ))}
            <Separator />
            <li className="flex gap-2">
              <ToggleTheme
                theme={isDarkTheme ? "dark" : "light"}
                labelText={isDarkTheme ? "Dark theme" : "Light theme"}
              />
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex min-h-[calc(100dvh-10rem)] flex-col border border-red-600 sm:ml-auto sm:min-h-[calc(100dvh-5rem)] sm:w-[calc(100dvw-14rem)]">
        {children}
      </main>
      <MainFooter />
    </>
  );
}
