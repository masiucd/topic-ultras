import {Flex} from "@radix-ui/themes";
import type {ReactNode} from "react";

import {Span, Strong} from "@/shared/components/ui/typography";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <header>
        <Flex className="mx-auto h-20 w-full max-w-6xl border-4">
          <Strong>Nutri Check</Strong>
        </Flex>
      </header>
      <main className="flex min-h-[calc(100dvh-10rem)] flex-col border border-red-600">
        {children}
      </main>
      <footer>
        <Flex className="mx-auto h-20 w-full max-w-6xl border-4">
          <Span>© 2021 Nutricheck</Span>
        </Flex>
      </footer>
    </>
  );
}
