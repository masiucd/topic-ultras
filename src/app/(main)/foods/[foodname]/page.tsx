import {eq} from "drizzle-orm";
import {redirect} from "next/navigation";
import type {ReactNode} from "react";

import {Span} from "@/components/typography";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {FoodTypeBadge} from "@/components/ui/food-type-badge";
import {Icons} from "@/components/ui/icons";
import {Separator} from "@/components/ui/sperator";
import {db} from "@/db";
import {foodNutrients, foods, foodTypes} from "@/db/schema";

async function getFoodItemByName(foodName: string) {
  try {
    let item = await db
      .select({
        name: foods.name,
        description: foods.description,
        type: {
          name: foodTypes.name,
          id: foodTypes.id,
        },
        nutrients: {
          calories: foodNutrients.calories,
          fat: foodNutrients.fat,
          protein: foodNutrients.protein,
          carbs: foodNutrients.carbs,
        },
      })
      .from(foods)
      .innerJoin(foodTypes, eq(foods.typeId, foodTypes.id))
      .innerJoin(foodNutrients, eq(foods.id, foodNutrients.foodId))
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
      <FoodCard foodItem={food} />
    </div>
  );
}

type FoodItem = NonNullable<Awaited<ReturnType<typeof getFoodItemByName>>>;
function FoodCard({foodItem}: {foodItem: FoodItem}) {
  return (
    <Card className="max-w-2xl ">
      <CardHeader className="relative">
        <CardTitle className="flex  items-center justify-between">
          <Span className="text-4xl capitalize">Nutrition Facts</Span>
          <Button size="sm">
            <Icons.Star />
          </Button>
        </CardTitle>
        <CardDescription className="text-lg">
          {/* {foodItem.description} */}
          Serving size: 100g (3.5 oz)
        </CardDescription>
      </CardHeader>
      <div className="mb-2 px-6">
        <Separator />
      </div>
      <CardContent>
        {/* TODO add vizual diagram */}
        <ul className="flex max-w-60 flex-col gap-4 pe-1.5">
          <ListItem
            iconAndLabel={{icon: <Icons.Food />, label: "Food"}}
            value={foodItem.name}
          />
          <ListItem
            iconAndLabel={{icon: <Icons.Label />, label: "Type"}}
            value={<FoodTypeBadge name={foodItem.type.name} />}
          />
          <ListItem
            iconAndLabel={{icon: <Icons.Calories />, label: "Calories"}}
            value={foodItem.nutrients.calories}
          />
          <ListItem
            iconAndLabel={{icon: <Icons.Fat />, label: "Total Fat"}}
            value={foodItem.nutrients.fat}
          />
          <ListItem
            iconAndLabel={{icon: <Icons.Protein />, label: "Protein"}}
            value={foodItem.nutrients.protein}
          />
          <ListItem
            iconAndLabel={{icon: <Icons.Carbs />, label: "Carbs"}}
            value={foodItem.nutrients.carbs}
          />
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button> */}
      </CardFooter>
    </Card>
  );
}

function ListItem({
  iconAndLabel,
  value,
}: {
  iconAndLabel: {icon: ReactNode; label: string};
  value: string | ReactNode;
}) {
  return (
    <li className="flex flex-col ">
      <div className="mb-5 flex items-center justify-between">
        <Span className="flex items-center gap-1 font-semibold">
          {iconAndLabel.icon} {iconAndLabel.label}:
        </Span>
        <Span className="capitalize">{value}</Span>
      </div>
      <Separator />
    </li>
  );
}
