import type {LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData, useLocation} from "@remix-run/react";
import {getFoodItemsData} from "~/.server/db/dao/food-items";
import {FoodItems} from "~/components/food-items/food-items-table";
import {Toolbar} from "~/components/food-items/toolbar";
import PageWrapper from "~/components/page-wrapper";
import {H1, Lead} from "~/components/ui/typography";
import {DEFAULT_FOOD_ITEMS_ROWS} from "~/lib/constants";

export async function loader({request}: LoaderFunctionArgs) {
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
export default function FoodItemsRoute() {
  let data = useLoaderData<typeof loader>();
  let location = useLocation();
  return (
    <PageWrapper>
      <H1>Food Items</H1>
      <Lead>
        Nutrition facts for the food you love. Search for food items by name.
      </Lead>
      <div className="mx-auto my-10 w-full max-w-[80rem]">
        <Toolbar
          allFoodCategories={data.allFoodCategories}
          location={location}
          results={data.results}
        />
        <div className="rounded-lg border-2">
          <FoodItems
            page={data.page}
            totalPages={data.totalPages}
            totalFoodItems={data.totalFoodItems}
            results={data.results}
            location={location}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
