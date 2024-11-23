import type {LoaderFunctionArgs} from "@remix-run/node";

import {type Location, useLoaderData, useLocation} from "@remix-run/react";
import {type FoodItemData, getFoodItemsData} from "~/.server/db/dao/food-items";
import {CategoryFilter} from "~/components/food-items/filters/category";
import {FoodItems} from "~/components/food-items/food-items-table";
import {SearchInput} from "~/components/food-items/search-input";
import {Icons} from "~/components/icons";
import PageWrapper from "~/components/page-wrapper";
import {Button} from "~/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {H1, Lead, List} from "~/components/ui/typography";
import {DEFAULT_FOOD_ITEMS_ROWS} from "~/lib/constants";

export async function loader({request}: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let name = url.searchParams.get("name");
  let category = url.searchParams.get("category");
  let rows = Number(url.searchParams.get("rows") || DEFAULT_FOOD_ITEMS_ROWS);
  let page = Number(url.searchParams.get("page")) || 1;

  return {
    ...(await getFoodItemsData({
      name,
      page,
      rows,
      categories: category !== null ? category.split("-").map(Number) : [],
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

function Toolbar(props: {
  allFoodCategories: FoodItemData["allFoodCategories"];
  location: Location;
}) {
  return (
    <div className="mb-2 flex justify-between gap-2 border border-red-500">
      <div className="flex gap-3">
        <div>
          <SearchInput location={props.location} />
        </div>
        <CategoryFilter allFoodCategories={props.allFoodCategories} />
      </div>
      <div className="flex gap-3">
        <Button variant="outline">
          <Icons.Download /> Export
        </Button>
        <ColumnView />
      </div>
    </div>
  );
}

function ColumnView() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-1" variant="outline">
          <Icons.Settings />
          Columns view
          <Icons.UpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <List className="flex list-none flex-col gap-2 capitalize">
          <li className="flex items-center justify-between">
            name <Icons.Check />
          </li>
          <li className="flex items-center justify-between">
            description <Icons.Check />
          </li>
          <li className="flex items-center justify-between">
            category <Icons.Check />
          </li>
          <li className="flex items-center justify-between">
            calories <Icons.Check />
          </li>
          <li className="flex items-center justify-between">
            Protein <Icons.Check />
          </li>
          <li className="flex items-center justify-between">
            Fat <Icons.Check />
          </li>
          <li className="flex items-center justify-between">
            Carbs <Icons.Check />
          </li>
        </List>
      </PopoverContent>
    </Popover>
  );
}
