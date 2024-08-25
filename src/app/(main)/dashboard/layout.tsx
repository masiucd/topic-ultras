import {Flex, Grid} from "@radix-ui/themes";
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
      <Grid columns="9" gap="3" className="border border-red-500">
        <Flex gridColumn="1 / span 3">{profile}</Flex>
        <Flex gridColumn="4 / span 3">{contact}</Flex>
        <Flex
          gridColumn={{
            sm: "7 / span 3",
            md: "7 / span 3",
          }}
        >
          {favorites}
        </Flex>
      </Grid>
    </PageWrapper>
  );
}
