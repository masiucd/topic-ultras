import {Flex} from "@radix-ui/themes";
import type {ReactNode} from "react";

import PageWrapper from "@/components/page-wrapper";

export default function DashboardLayout({
  children,
  contact,
  favorites,
  profile,
}: {
  children: ReactNode;
  contact: ReactNode;
  favorites: ReactNode;
  profile: ReactNode;
}) {
  return (
    <PageWrapper>
      {children}
      <div className="flex flex-wrap gap-4 md:grid md:grid-flow-col md:grid-rows-3">
        <Flex className="md:row-span-3">{profile}</Flex>
        <Flex className="md:col-span-2">{contact}</Flex>
        <Flex className="md:col-span-2 md:row-span-2">{favorites}</Flex>
      </div>
    </PageWrapper>
  );
}
