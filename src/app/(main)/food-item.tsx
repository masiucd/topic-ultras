import type {ReactNode} from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import {Icons} from "@/_components/ui/icons";
import {Link} from "@/_components/ui/link";
import {Separator} from "@/_components/ui/separator";
import {Muted} from "@/_components/ui/typography";
import {ICON_SIZE} from "@/lib/constants";
import {cn} from "@/lib/utils";
import type {FoodResult} from "@/persistence/food/types";

import {FoodTypeBadge} from "./foods/food-type-badge";

export function FoodItem({
  food,
  className,
  cardFooterContent,
}: {
  food: FoodResult;
  className?: string;
  cardFooterContent: ReactNode;
}) {
  let {
    foodName,
    description,
    calories,
    carbs,
    totalFat,
    protein,
    foodType,
    foodId,
  } = food;

  return (
    <Card as="li" className={cn("relative w-full flex flex-col  ", className)}>
      <CardHeader className="h-full max-h-[150px]">
        <Link href={`/food-categories/${foodType}`}>
          <FoodTypeBadge
            className="absolute right-2 top-2 hover:opacity-70"
            foodType={foodType ?? "OTHER"}
          />
        </Link>

        <CardTitle className="capitalize">
          <Link href={`/foods/${foodId}`}>{foodName}</Link>
        </CardTitle>
        <CardDescription className="text-pretty">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="my-1" />
        <FoodItemDataList
          calories={calories}
          carbs={carbs}
          totalFat={totalFat}
          protein={protein}
        />
      </CardContent>
      <CardFooter>{cardFooterContent}</CardFooter>
    </Card>
  );
}

export function FoodItemDataList({
  calories,
  carbs,
  totalFat,
  protein,
}: {
  calories: number;
  carbs: number;
  totalFat: number;
  protein: number;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between gap-1">
        <Muted className="flex items-center gap-1">
          <Icons.Calorie size={ICON_SIZE} />
          Calories
        </Muted>
        <span className="text-sm font-bold">{calories} / 100g</span>
      </div>

      <div className="flex justify-between gap-1">
        <Muted className="flex items-center gap-1">
          <Icons.Carbs size={ICON_SIZE} />
          Carbohydrates
        </Muted>
        <span className="text-sm font-bold">{carbs} / 100g</span>
      </div>

      <div className="flex justify-between gap-1">
        <Muted className="flex items-center gap-1">
          <Icons.Fat size={ICON_SIZE} />
          Total Fat
        </Muted>
        <span className="text-sm font-bold">{totalFat} / 100g</span>
      </div>

      <div className="flex justify-between gap-1">
        <Muted className="flex items-center gap-1">
          <Icons.Protein size={ICON_SIZE} />
          Protein
        </Muted>
        <span className="text-sm font-bold">{protein} / 100g</span>
      </div>
    </div>
  );
}
