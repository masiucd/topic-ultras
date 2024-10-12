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
import {eq} from "drizzle-orm";

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

export default async function Home() {
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
    .limit(4);

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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>
              <Muted>Total</Muted>
              <Muted>{allFoodItems.length}</Muted>
            </TableCell>
            <TableCell>
              <Muted>a</Muted>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </PageWrapper>
  );
}

function FoodTypeBadge({foodType}: {foodType: FoodType}) {
  return <Badge className="uppercase">{foodType}</Badge>;
}
function FoodCategoryBadge({foodCategory}: {foodCategory: string}) {
  return <Badge className="uppercase">{foodCategory}</Badge>;
}
