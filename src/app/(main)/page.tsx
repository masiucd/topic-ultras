import {PageWrapper} from "@/shared/components/page-wrapper";

import {SearchFoodRecords} from "./search-food-records";

export default async function HomePage() {
  return (
    <PageWrapper>
      <div className="flex w-full flex-1 flex-col items-center border border-red-500">
        <SearchFoodRecords />
      </div>
    </PageWrapper>
  );
}
