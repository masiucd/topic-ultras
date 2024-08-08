import type {ReactNode} from "react";

import {Strong} from "@/components/typography";
import {appData} from "@/lib/config";

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <header>
        <Strong>{appData.title}</Strong>
      </header>
      <main>{children}</main>
      <footer>
        <small>
          {appData.title} &copy; {new Date().getFullYear()}
        </small>
      </footer>
    </>
  );
}
