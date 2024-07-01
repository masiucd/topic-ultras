import {Box, Flex} from "@radix-ui/themes";

import {PageWrapper} from "@/shared/components/page-wrapper";
import {H1, P} from "@/shared/components/ui/typography";

import {SearchFoodRecords} from "./search-food-records";

export default async function HomePage() {
  return (
    <PageWrapper className="border border-red-500">
      <Box className="w-full max-w-4xl border border-red-400">
        <Flex direction="column" gap="1" className="border-4" mb="3">
          <H1>Search for a food item</H1>
          <P>
            Welcome to the food tracker! Search for food to see its nutritional
            information.
          </P>
        </Flex>
        <SearchFoodRecords />
      </Box>
    </PageWrapper>
  );
}
