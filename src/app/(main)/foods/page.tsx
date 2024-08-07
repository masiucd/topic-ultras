import {eq} from "drizzle-orm";
import {alias} from "drizzle-orm/pg-core";
import Link from "next/link";

import {List, Span, Strong} from "@/components/typography";
import {Badge} from "@/components/ui/badge";
import {db} from "@/db";
import {foodNutrients, foods, foodTypes} from "@/db/schema";

export default async function FoodsPage() {
  let ft = alias(foodTypes, "foodType");
  let f = alias(foods, "food");
  let xs = await db
    .select({
      foodId: f.id,
      foodName: f.name,
      foodType: ft.name,
      data: {
        calories: foodNutrients.calories,
        fat: foodNutrients.fat,
        protein: foodNutrients.protein,
        carbs: foodNutrients.carbs,
      },
    })
    .from(f)
    .innerJoin(ft, eq(f.typeId, ft.id))
    .innerJoin(foodNutrients, eq(f.id, foodNutrients.foodId));
  return (
    <div>
      {" "}
      <List className="list-none">
        {xs.map((x) => (
          <li key={x.foodId}>
            <div className="flex gap-2">
              <Strong className="capitalize">{x.foodName}</Strong>
              <FoodTypeBadge foodType={x.foodType} />
            </div>
            <List>
              <li>
                <Span>Calories: {x.data.calories}</Span>
              </li>
              <li>
                <Span>Fat: {x.data.fat}</Span>
              </li>
              <li>
                <Span>Protein: {x.data.protein}</Span>
              </li>
              <li>
                <Span>Carbs: {x.data.carbs}</Span>
              </li>
            </List>
          </li>
        ))}
      </List>
    </div>
  );
}

function FoodTypeBadge({foodType}: {foodType: string}) {
  return (
    <Link href="/">
      <Badge className="uppercase">{foodType}</Badge>
    </Link>
  );
}
