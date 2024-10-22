import PageWrapper from "@/components/page-wrapper";

import {Skeleton} from "@/components/ui/skeleton";
import {H1, Lead} from "@/components/ui/typography";
import {Suspense} from "react";
import {FoodItemSearch} from "./_components/food-item-search";
import {FoodTable} from "./_components/food-table";

export default async function Home(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  let name = (await props.searchParams).name;
  return (
    (<PageWrapper>
      <H1>Food Items</H1>
      <Lead>
        Browse through our food items database and find the nutritional values
        of your favorite foods.
      </Lead>
      <section className="px-1 md:px-3">
        <div className="my-5 flex flex-col gap-2 md:max-w-xl">
          <FoodItemSearch
            label="Search for food items"
            htmlFor="search"
            placeholder="Apple, Banana, etc."
            type="text"
            name={name}
          />
        </div>
        <Suspense fallback={<FoodTableSkeleton />}>
          <FoodTable name={name} searchParams={(await props.searchParams)} />
        </Suspense>
      </section>
    </PageWrapper>)
  );
}

function FoodTableSkeleton() {
  return (
    <div className="flex flex-col gap-4 ">
      <Skeleton className="h-4 w-9/12" />
      <Skeleton className="h-4 w-4/12" />
      <Skeleton className="h-4 w-3/12" />
      <Skeleton className="h-4 w-3/2" />
      <Skeleton className="h-4 w-8/12" />
      <Skeleton className="h-4 w-9/12" />
      <Skeleton className="h-4 w-5/12" />
      <Skeleton className="h-4 w-9/12" />
      <Skeleton className="h-4 w-10/12" />
    </div>
  );
}
