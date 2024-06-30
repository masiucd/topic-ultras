import {Flex} from "@radix-ui/themes";

import {PageWrapper} from "@/shared/components/page-wrapper";
import {Callout} from "@/shared/components/ui/callout";
import {P} from "@/shared/components/ui/typography";

import {SearchFoodRecords} from "./search-food-records";

export default async function HomePage() {
  return (
    <PageWrapper>
      <div className="flex w-full flex-1 flex-col items-center border border-red-500">
        <SearchFoodRecords>
          <Flex maxWidth="500px" my="3">
            <Callout variant="soft" type="info" size="1">
              <P>
                Welcome to the food tracker! Search for food to see its
                nutritional information.
              </P>
            </Callout>
          </Flex>
        </SearchFoodRecords>
      </div>
    </PageWrapper>
  );
}
