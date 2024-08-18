import {Flex, type FlexProps, Link as RadixLink} from "@radix-ui/themes";
import Link from "next/link";
import type {ReactNode} from "react";

import {Strong} from "@/components/typography";
import {ActiveLink} from "@/components/ui/active-link";
import {getUserFromSession} from "@/lib/auth";
import {appData} from "@/lib/config";
import {cn} from "@/lib/utils";

import {Logout} from "./actions";

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100dvh-10rem)] flex-col">
        {children}
      </main>
      <footer className="h-20">
        <Wrapper>
          <small>
            {appData.title} &copy; {new Date().getFullYear()}
          </small>
        </Wrapper>
      </footer>
    </>
  );
}

function Header() {
  return (
    <header className="h-20">
      <Wrapper justify="between">
        <Link href="/" className="decoration-gray-700/45 hover:underline">
          <Strong>{appData.title}</Strong>
        </Link>
        <Nav />
      </Wrapper>
    </header>
  );
}

async function Nav() {
  let user = await getUserFromSession();
  return (
    <nav>
      <Flex asChild gap="2" align="center">
        <ul>
          {appData.routes.map((route) => (
            <li key={route.name}>
              <ActiveLink href={route.href}>{route.name}</ActiveLink>
            </li>
          ))}
          {user !== null ? (
            <li className="ml-1">
              <form action={Logout}>
                <RadixLink asChild size="2" weight="medium">
                  <button type="submit">Logout</button>
                </RadixLink>
              </form>
            </li>
          ) : (
            <li>
              <ActiveLink href="/login">Sign in</ActiveLink>
            </li>
          )}
        </ul>
      </Flex>
    </nav>
  );
}

function Wrapper(props: FlexProps) {
  return (
    <Flex asChild align="center" {...props}>
      <div className={cn("mx-auto  h-full max-w-6xl", props.className)}>
        {props.children}
      </div>
    </Flex>
  );
}
