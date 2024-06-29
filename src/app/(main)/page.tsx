import {Box} from "@radix-ui/themes";

import {PageWrapper} from "@/shared/components/page-wrapper";
import {P} from "@/shared/components/ui/typography";

import {SearchFoodRecords} from "./search-food-records";

export default async function HomePage() {
  return (
    <PageWrapper>
      <div className="flex w-full flex-1 flex-col items-center border border-red-500">
        <SearchFoodRecords>
          <Box
            my="5"
            className="flex flex-col gap-2 rounded-md border-2 border-gray-900 bg-gray-200 px-2 py-3 shadow-md md:w-96"
          >
            <P weight="medium">
              Please search for a food to get nutrition facts.
            </P>
          </Box>
        </SearchFoodRecords>
      </div>
    </PageWrapper>
  );
}
