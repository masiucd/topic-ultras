import PageWrapper from "@/components/page-wrapper";
import {Badge} from "@/components/ui/badge";
import {
  Table,
  TableBody,
  // TableFooter,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Muted} from "@/components/ui/typography";
import {db} from "@/db";
import {foodCategories, foodItems, foodNutrients} from "@/db/schema";
import type {FoodType} from "@/db/schema/food-items";
import {eq, sql} from "drizzle-orm";
import Link from "next/link";

// type Foo = infer SelectModel<typeof foodCategories>;
// type SelectUser = typeof foodCategories.$inferSelect['name'];

// import {setExpire} from "@/db/redis";

// async function redisTest(data: FormData) {
//   "use server";
//   let name = data.get("name");

//   if (typeof name !== "string") {
//     throw new Error("Name is not a string");
//   }

//   setExpire({key: "team", value: name});
// }

const ITEMS_PER_PAGE = 5;

export default async function Home(props: {
  searchParams: Record<string, string>;
}) {
  let limit = Number.parseInt(props.searchParams.limit, 10) || ITEMS_PER_PAGE;
  let skip = Number.parseInt(props.searchParams.skip, 10) || 0;

  let totalFoodItems = await db
    .select({
      count: sql`count(*)`.mapWith(Number),
    })
    .from(foodItems);

  let allFoodItems = await db
    .select({
      foodName: foodItems.name,
      foodDescription: foodItems.description,
      foodType: foodItems.foodType,
      foodCategory: foodCategories.name,
      nutrients: {
        calories: foodNutrients.calories,
        protein: foodNutrients.protein,
        fat: foodNutrients.fat,
        carbs: foodNutrients.carbs,
      },
    })
    .from(foodItems)
    .innerJoin(foodNutrients, eq(foodItems.id, foodNutrients.foodId))
    .innerJoin(foodCategories, eq(foodItems.foodCategoryId, foodCategories.id))
    .orderBy(foodItems.name)
    .limit(limit) // limit 4
    .offset(skip); // skip 4

  let page = Math.floor(skip / limit) + 1;
  let totalPages = Math.ceil(totalFoodItems[0].count / limit) + 1;

  return (
    <PageWrapper className="border border-red-500">
      <h1>Nutri Check</h1>
      <p>
        Nutri Check application where you can track your nutrition and health.
      </p>

      <Table>
        <TableCaption>
          <Muted>Food items stored in the database</Muted>
          <Muted>All food items is calculated per 100g</Muted>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Food item</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Calories</TableHead>
            <TableHead>Protein</TableHead>
            <TableHead>Fat</TableHead>
            <TableHead>Carbs</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allFoodItems.map((foodItem) => (
            <TableRow key={foodItem.foodName}>
              <TableCell>{foodItem.foodName}</TableCell>
              <TableCell>{foodItem.foodDescription}</TableCell>
              <TableCell>
                <FoodTypeBadge foodType={foodItem.foodType} />
              </TableCell>
              <TableCell>
                <FoodCategoryBadge foodCategory={foodItem.foodCategory} />
              </TableCell>
              <TableCell>{foodItem.nutrients.calories}</TableCell>
              <TableCell>{foodItem.nutrients.protein}</TableCell>
              <TableCell>{foodItem.nutrients.fat}</TableCell>
              <TableCell>{foodItem.nutrients.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Footer
          skip={skip}
          limit={limit}
          totalFoodItems={totalFoodItems}
          page={page}
          totalPages={totalPages}
        />
      </Table>
    </PageWrapper>
  );
}

function Footer(props: {
  skip: number;
  limit: number;
  totalFoodItems: {count: number}[];

  page: number;
  totalPages: number;
}) {
  let {skip, limit, totalFoodItems, page, totalPages} = props;
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={7}>
          <Muted>
            Page {page} of {totalPages} pages
          </Muted>
          <Muted>{totalFoodItems[0].count} items in total</Muted>
        </TableCell>
        <TableCell>
          <div className="flex gap-2">
            <PrevLink limit={limit} skip={skip} />
            <NextLink
              skip={skip}
              limit={limit}
              totalFoodItems={totalFoodItems}
            />
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}

function PrevLink({skip, limit}: {skip: number; limit: number}) {
  let prevUrl = `/?limit=${limit}&skip=${skip - limit}`;
  return (
    <Link className={skip === 0 ? "pointer-events-none" : ""} href={prevUrl}>
      prev
    </Link>
  );
}
function NextLink({
  skip,
  limit,
  totalFoodItems,
}: {
  skip: number;
  limit: number;
  totalFoodItems: {count: number}[];
}) {
  let nextUrl = `/?limit=${limit}&skip=${skip + limit}`;
  return (
    <Link
      className={
        skip + limit > totalFoodItems[0].count ? "pointer-events-none" : ""
      }
      href={nextUrl}
    >
      next
    </Link>
  );
}

function FoodTypeBadge({foodType}: {foodType: FoodType}) {
  return <Badge className="uppercase">{foodType}</Badge>;
}
function FoodCategoryBadge({foodCategory}: {foodCategory: string}) {
  return <Badge className="uppercase">{foodCategory}</Badge>;
}
