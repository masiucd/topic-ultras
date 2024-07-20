import {PageWrapper} from "@/_components/page-wrapper";
import {H1, Lead, P} from "@/_components/ui/typography";

import {SearchFoodRecords} from "./search-food-records";

export default async function HomePage() {
  return (
    <PageWrapper className="mb-10">
      <div className="my-4 mb-3 flex flex-col ">
        <H1>Search for a food item</H1>
        <Lead>
          Welcome to the food tracker! Search for food to see its nutritional
          information.
        </Lead>
      </div>
      <SearchFoodRecords />
    </PageWrapper>
  );
}
