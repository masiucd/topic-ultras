import {Flex, type FlexProps} from "@radix-ui/themes";
import Link from "next/link";
import type {ReactNode} from "react";

import {Strong} from "@/components/typography";
import {appData} from "@/lib/config";
import {cn} from "@/lib/utils";

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <header className="h-20">
        <Wrapper justify="between">
          <Link href="/" className="decoration-gray-700/45 hover:underline">
            <Strong>{appData.title}</Strong>
          </Link>
          <Nav />
        </Wrapper>
      </header>
      <main className="min-h-[calc(100dvh-10rem)]">{children}</main>
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

function Nav() {
  return (
    <nav>
      <Flex asChild gap="2">
        <ul>
          {appData.routes.map((route) => (
            <li key={route.name}>
              <Link href={route.href}>{route.name}</Link>
            </li>
          ))}
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
