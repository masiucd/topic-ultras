import {db} from "@/app/db";
import {foodCategories, foodItems, foodNutrients} from "@/app/db/schema";
import PageWrapper from "@/components/page-wrapper";
import {H1} from "@/components/typography";
import {Badge} from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {count, eq, ilike, sql} from "drizzle-orm";
import {FoodItemSearch} from "./_components/food-item-search";
import {NextPage, PreviousPage} from "./_components/paggination";

// type Params = Promise<{slug: string}>;
type SearchParams = Promise<{[key: string]: string | string[] | undefined}>;

async function getFoodItems({
  searchTerm,
  rows,
  offset,
}: {
  searchTerm?: string;
  rows: number;
  offset: number;
}) {
  return await db
    .select({
      id: foodItems.id,
      name: foodItems.name,
      description: foodItems.description,
      foodCateGory: foodCategories.name,
      nutrients: {
        id: foodNutrients.id,
        calories: foodNutrients.calories,
        protein: foodNutrients.protein,
        fat: foodNutrients.fat,
        carbs: foodNutrients.carbs,
      },
    })
    .from(foodItems)
    .leftJoin(foodNutrients, eq(foodItems.id, foodNutrients.foodId))
    .leftJoin(foodCategories, eq(foodItems.foodCategoryId, foodCategories.id))
    .orderBy(sql`${foodItems.name} ASC`)
    .where(searchTerm ? ilike(foodItems.name, `%${searchTerm}%`) : undefined)
    .limit(rows)
    .offset(offset);
}

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
  let foodItems = await getFoodItems({
    searchTerm,
    rows: ITEMS_PER_PAGE,
    offset: (page - 1) * ITEMS_PER_PAGE,
  });

  let amountOfPages = Math.ceil(amountOfFoodItems / ITEMS_PER_PAGE);

  return (
    <PageWrapper>
      <H1>Food Items</H1>
      <div>
        <div className="my-5 bg-red-100 px-2 py-3">
          <FoodItemSearch />
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Calories</TableHead>
              <TableHead>Protein</TableHead>
              <TableHead>Fat</TableHead>
              <TableHead>Carbs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {foodItems.map((foodItem) => {
              return (
                <TableRow key={foodItem.id}>
                  <TableCell>{foodItem.name}</TableCell>
                  <TableCell>{foodItem.description}</TableCell>
                  <TableCell>
                    <Badge className="capitalize">
                      {foodItem.foodCateGory}
                    </Badge>
                  </TableCell>
                  <TableCell>{foodItem.nutrients?.calories ?? "N/A"}</TableCell>
                  <TableCell>{foodItem.nutrients?.protein ?? "N/A"}</TableCell>
                  <TableCell>{foodItem.nutrients?.fat ?? "N/A"}</TableCell>
                  <TableCell>{foodItem.nutrients?.carbs ?? "N/A"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                Total {foodItems.length * page} / {amountOfFoodItems} items
              </TableCell>

              <TableCell className="bg-red-100">
                <div className="flex justify-end gap-3 bg-blue-200">
                  <PreviousPage page={page} />
                  <NextPage page={page} amountOfPages={amountOfPages} />
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </PageWrapper>
  );
}
