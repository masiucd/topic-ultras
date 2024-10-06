import PageWrapper from "@/components/page-wrapper";
import {Badge} from "@/components/ui/badge";
import {db} from "@/db";
import {foodCategories, foodItems, foodNutrients} from "@/db/schema";
import {eq} from "drizzle-orm";
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
    .innerJoin(foodCategories, eq(foodItems.foodCategoryId, foodCategories.id));

  return (
    <PageWrapper className="border border-red-500">
      <h1>Nutri Check</h1>
      <p>
        Nutri Check application where you can track your nutrition and health.
      </p>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <ul>
        {allFoodItems.map((foodItem) => (
          <li key={foodItem.foodName}>{foodItem.foodName}</li>
        ))}
      </ul>
    </PageWrapper>
  );
}
