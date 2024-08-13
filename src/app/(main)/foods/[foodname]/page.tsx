import {redirect} from "next/navigation";
import type {ReactNode} from "react";

import PageWrapper from "@/components/page-wrapper";
import {P, Span} from "@/components/typography";
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

import {getFoodItemByName} from "./_data/food-item";
import {PieChart} from "./pie";
import type {FoodItem} from "./types";

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
    <PageWrapper>
      <div className="flex flex-col gap-2 border border-red-500 md:flex-row">
        <FoodCard foodItem={food} />
        <div className="flex flex-1 items-center">
          <PieChart foodItem={food} />
        </div>
      </div>
    </PageWrapper>
  );
}

function FoodCard({foodItem}: {foodItem: FoodItem}) {
  return (
    <Card className="flex-1">
      <CardHeader className="relative">
        <CardTitle className="flex  items-center justify-between">
          <Span className="text-4xl capitalize">Nutrition Facts</Span>
          <Button size="sm">
            <Icons.Star />
          </Button>
        </CardTitle>
        <CardDescription className="text-lg">
          <P>Serving size: 100g (3.5 oz).</P>
          <P>{foodItem.description}</P>
        </CardDescription>
      </CardHeader>
      <div className="mb-2 px-6">
        <Separator />
      </div>
      <CardContent>
        <ul className="flex  flex-1 flex-col gap-4 border border-red-500 px-5 py-2">
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
