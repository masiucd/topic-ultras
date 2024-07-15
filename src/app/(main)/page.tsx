import {PageWrapper} from "@/_components/page-wrapper";
import {H1, P} from "@/_components/ui/typography";

import {SearchFoodRecords} from "./search-food-records";

export default async function HomePage() {
  return (
    <PageWrapper>
      <div className="border-2 border-red-400">
        <div className="mb-3 flex flex-col gap-2 border-4">
          <H1>Search for a food item</H1>
          <P>
            Welcome to the food tracker! Search for food to see its nutritional
            information.
          </P>
        </div>
        <SearchFoodRecords />
      </div>
    </PageWrapper>
  );
}
