import {useState} from "react";
import {getFoodItemsData} from "~/.server/db/dao/food-items";
import {FoodItems} from "~/components/food-items/food-items-table";
import {Toolbar} from "~/components/food-items/toolbar";
import PageWrapper from "~/components/page-wrapper";
import {H1, Lead} from "~/components/ui/typography";
import {
  type Column,
  DEFAULT_COLUMNS,
  DEFAULT_FOOD_ITEMS_ROWS,
} from "~/lib/constants";
import type {Route} from "./+types/food-items";

export async function loader({request}: Route.LoaderArgs) {
  let url = new URL(request.url);
  let name = url.searchParams.get("name");
  let category = url.searchParams.get("category");
  let rows = Number(url.searchParams.get("rows") || DEFAULT_FOOD_ITEMS_ROWS);
  let page = Number(url.searchParams.get("page")) || 1;
  let sort = url.searchParams.get("sort");
  return {
    ...(await getFoodItemsData({
      name,
      page,
      rows,
      categories: category !== null ? category.split("-").map(Number) : [],
      sort,
    })),
  };
}

// TODO : copy url feature to share the search results
export default function FoodItemsRoute({loaderData}: Route.ComponentProps) {
  let [selectedColumns, setSelectedColumns] = useState<Set<Column>>(
    new Set(DEFAULT_COLUMNS)
  );

  return (
    <PageWrapper>
      <H1>Food Items</H1>
      <Lead>
        Nutrition facts for the food you love. Search for food items by name.
      </Lead>
      <div className="mx-auto my-10 w-full max-w-[80rem]">
        <Toolbar
          allFoodCategories={loaderData.allFoodCategories}
          results={loaderData.results}
          selectedColumns={selectedColumns}
          selectColumn={(column: Column, checked: boolean) => {
            setSelectedColumns((prev) => {
              let newSet = new Set(prev);
              if (checked) {
                newSet.add(column);
              } else {
                newSet.delete(column);
              }
              return newSet;
            });
          }}
        />
        <div className="rounded-lg border-2">
          <FoodItems
            page={loaderData.page}
            totalPages={loaderData.totalPages}
            totalFoodItems={loaderData.totalFoodItems}
            results={loaderData.results}
            selectedColumns={selectedColumns}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
