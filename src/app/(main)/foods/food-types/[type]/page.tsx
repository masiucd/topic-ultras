import {eq} from "drizzle-orm";
import Link from "next/link";

import {H1, Lead, List} from "@/components/typography";
import {db} from "@/db";
import {foods, foodTypes} from "@/db/schema";

async function getFoodType(foodType: string) {
  let items = await db
    .select({
      name: foodTypes.name,

      foodItems: {
        id: foods.id,
        name: foods.name,
        slug: foods.slug,
      },
    })
    .from(foodTypes)
    .innerJoin(foods, eq(foodTypes.id, foods.typeId))
    .where(eq(foodTypes.name, foodType));

  return {foodTypes: items, foodType: items[0]};
}

export default async function FoodTypePage({
  params: {type},
}: {
  params: {type: string};
}) {
  let {foodTypes, foodType} = await getFoodType(type);
  let foodItems = foodTypes.map((x) => x.foodItems);
  console.log("🚀 ~ foodType:", foodType);

  return (
    <div>
      <H1>{foodType?.name}</H1>
      <Lead>
        Food items in the <strong>{foodType?.name}</strong> category.
      </Lead>
      <List>
        {foodItems.map((item) => (
          <li key={item.id}>
            <Link href={`/foods/${item.slug}`}>{item.name}</Link>
          </li>
        ))}
      </List>
    </div>
  );
}

// type FoodType = Awaited<ReturnType<typeof getFoodType>>["foodTypes"][number];
// function groupByFoodType(foodTypes: FoodType[]) {
//   let map = new Map<string, FoodType["foodItems"][]>();
//   for (let item of foodTypes) {
//     if (!map.has(item.name)) {
//       map.set(item.name, [item.foodItems]);
//     } else {
//       map.get(item.name)?.push(item.foodItems);
//     }
//   }
//   return map;
// }
