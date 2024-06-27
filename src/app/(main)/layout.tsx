import {Flex} from "@radix-ui/themes";
import type {ReactNode} from "react";

import {H1, Span} from "@/shared/components/ui/typography";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <header>
        <Flex className="mx-auto h-20 w-full max-w-6xl border-4">
          <H1 size="3">Nutricheck</H1>
        </Flex>
      </header>
      <main>{children}</main>
      <footer>
        <Flex className="mx-auto h-20 w-full max-w-6xl border-4">
          <Span>© 2021 Nutricheck</Span>
        </Flex>
      </footer>
    </>
  );
}
