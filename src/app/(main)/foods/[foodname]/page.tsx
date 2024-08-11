import {eq} from "drizzle-orm";
import {redirect} from "next/navigation";

import {H1, P} from "@/components/typography";
import {db} from "@/db";
import {foods} from "@/db/schema";

async function getFoodItemByName(foodName: string) {
  try {
    let item = await db
      .select({
        name: foods.name,
        description: foods.description,
      })
      .from(foods)
      .where(eq(foods.slug, foodName));

    return item[0];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
}

export default async function FoodNamePage({
  params: {foodname},
}: {
  params: {foodname: string};
}) {
  let food = await getFoodItemByName(foodname);
  if (!food) {
    return redirect("/404");
  }
  return (
    <div>
      <H1 className="capitalize">{food.name}</H1>
      <P>{food.description}</P>
    </div>
  );
}
