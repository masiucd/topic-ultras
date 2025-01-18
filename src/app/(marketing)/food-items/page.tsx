import {db} from "@/app/db";
import {getFoodItems} from "@/app/db/dao/food-items";
import {foodItems} from "@/app/db/schema";
import PageWrapper from "@/components/page-wrapper";
import {H1} from "@/components/typography";
import {count} from "drizzle-orm";
import {ColumnsFilter} from "./_components/columns-filter";
import {ExportToCsvButton} from "./_components/export-to-csv-button";
import {FoodItemsTable} from "./_components/food-items-table";
import {Toolbar} from "./_components/toolbar";

// type Params = Promise<{slug: string}>;
type SearchParams = Promise<{[key: string]: string | string[] | undefined}>;

async function getAmountOfFoodItems() {
  let rows = await db.select({count: count()}).from(foodItems);
  return rows[0].count;
}
const ITEMS_PER_PAGE = 10;

export default async function FoodItemsPage(props: {
  searchParams: SearchParams;
}) {
  let amountOfFoodItems = await getAmountOfFoodItems();
  let searchParams = await props.searchParams;
  let searchTerm = searchParams.search as string | undefined;
  let page =
    typeof searchParams.page === "string"
      ? Number.parseInt(searchParams.page) || 1
      : 1;
  let category = searchParams.category as string | undefined;
  let foodItems = await getFoodItems({
    searchTerm,
    rows: ITEMS_PER_PAGE,
    offset: (page - 1) * ITEMS_PER_PAGE,
    categories: category ? category.split("-") : [],
  });

  let amountOfPages = Math.ceil(amountOfFoodItems / ITEMS_PER_PAGE);

  return (
    <PageWrapper>
      <H1>Food Items</H1>
      <div>
        <Toolbar>
          <ExportToCsvButton foodItems={foodItems} />
          <ColumnsFilter />
        </Toolbar>
        <FoodItemsTable
          foodItems={foodItems}
          page={page}
          amountOfPages={amountOfPages}
          amountOfFoodItems={amountOfFoodItems}
        />
      </div>
    </PageWrapper>
  );
}
