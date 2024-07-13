import type {ReactNode} from "react";

import {MainFooter} from "../_layout-components/main-footer";
import {MainHeader} from "../_layout-components/main-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      <main className="flex min-h-[calc(100dvh-10rem)] flex-col border border-red-600">
        {children}
      </main>
      <MainFooter />
    </>
  );
}
