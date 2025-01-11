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
import {eq, ilike} from "drizzle-orm";
import Link from "next/link";
import {FoodItemSearch} from "./_components/food-item-search";

// type Params = Promise<{slug: string}>;
type SearchParams = Promise<{[key: string]: string | string[] | undefined}>;

async function getFoodItems({searchTerm}: {searchTerm?: string}) {
  let rows = await db
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
    .where(searchTerm ? ilike(foodItems.name, `%${searchTerm}%`) : undefined);
  return rows;
}

export default async function FoodItemsPage(props: {
  searchParams: SearchParams;
}) {
  let searchParams = await props.searchParams;
  let searchTerm = searchParams.search as string | undefined;
  let page = searchParams.page ?? Number.parseInt(searchParams.page || "1", 10);
  let foodItems = await getFoodItems({searchTerm});
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
              <TableCell colSpan={6}>Total</TableCell>
              <TableCell className="text-right">
                {foodItems.length} items
              </TableCell>
              <TableCell className="bg-red-100">
                <div className="flex justify-end gap-3 bg-blue-200">
                  <Link href="/food-items">next</Link>
                  <Link href="/food-items">prev</Link>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </PageWrapper>
  );
}
