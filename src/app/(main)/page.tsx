import {Box, Flex} from "@radix-ui/themes";

// import {PageWrapper} from "@/shared/components/page-wrapper";
import {H1, P} from "@/shared/components/typography";

import {SearchFoodRecords} from "./search-food-records";

export default async function HomePage() {
  return (
    // <PageWrapper className="w-[74rem] bg-red-300">
    <Box className="border-2 border-red-400 sm:ml-auto sm:w-[calc(100dvw-14rem)]">
      <Flex direction="column" gap="1" className="border-4" mb="3">
        <H1>Search for a food item</H1>
        <P>
          Welcome to the food tracker! Search for food to see its nutritional
          information.
        </P>
      </Flex>
      <SearchFoodRecords />
    </Box>
    // </PageWrapper>
  );
}
