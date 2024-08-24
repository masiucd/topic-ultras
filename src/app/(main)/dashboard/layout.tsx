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
      <Flex>
        {profile}
        {contact}
        {favorites}
      </Flex>
    </PageWrapper>
  );
}
