import type {PropsWithChildren, ReactNode} from "react";

import {Strong} from "@/components/typography";
import {appData} from "@/lib/config";

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <header className="h-20">
        <Wrapper>
          <Strong>{appData.title}</Strong>
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

function Wrapper({children}: PropsWithChildren) {
  return (
    <div className="mx-auto flex h-full max-w-6xl border border-red-400">
      {children}
    </div>
  );
}
