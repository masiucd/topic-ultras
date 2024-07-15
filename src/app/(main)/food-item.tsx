import Link from "next/link";

import {Separator} from "@/_components/ui/separator";
import {P} from "@/_components/ui/typography";
import {cn} from "@/lib/utils";
import type {FoodResult} from "@/persistence/food/types";

import {FoodTypeBadge} from "./foods/food-type-badge";

export function FoodItem({
  food,
  className,
}: {
  food: FoodResult;
  className?: string;
}) {
  let {foodName, description, calories, carbs, totalFat, protein, foodType} =
    food;
  return (
    <li
      className={cn(
        "relative flex flex-col gap-2 rounded-md border border-gray-900 px-2 py-3 shadow-md",
        className,
      )}
    >
      <Link
        href={`/food-types-categories/${food.foodType ?? "Other"}`}
        color="gray"
      >
        <FoodTypeBadge
          className="absolute right-2 top-2 hover:opacity-70"
          foodType={foodType ?? "Other"}
          disableTooltip
          highContrast
        />
      </Link>
      <div className="flex flex-col gap-1">
        <P className="capitalize">
          <Link href={`/foods/${food.foodId}`}>{foodName}</Link>
        </P>

        <P className="text-pretty">{description}</P>
      </div>
      <Separator className="my-1" />
      <FoodItemDataList
        calories={calories}
        carbs={carbs}
        totalFat={totalFat}
        protein={protein}
      />
    </li>
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
    <></>
    // <DataList.Root>
    //   <DataList.Item>
    //     <DataList.Label minWidth="88px">
    //       <Tooltip content="Calories">
    //         <Icons.Calorie size={ICON_SIZE} />
    //       </Tooltip>
    //     </DataList.Label>
    //     <DataList.Value>
    //       <P size="2" weight="medium">
    //         {calories}
    //       </P>
    //     </DataList.Value>
    //   </DataList.Item>
    //   <DataList.Item>
    //     <DataList.Label minWidth="88px">
    //       <Tooltip content="Carbohydrates">
    //         <Icons.Carbs size={ICON_SIZE} />
    //       </Tooltip>
    //     </DataList.Label>
    //     <DataList.Value>
    //       <P size="2" weight="medium">
    //         {carbs}
    //       </P>
    //     </DataList.Value>
    //   </DataList.Item>
    //   <DataList.Item>
    //     <DataList.Label minWidth="88px">
    //       <Tooltip content="Total Fat">
    //         <Icons.Fat size={ICON_SIZE} />
    //       </Tooltip>
    //     </DataList.Label>
    //     <DataList.Value>
    //       <P size="2" weight="medium">
    //         {totalFat}
    //       </P>
    //     </DataList.Value>
    //   </DataList.Item>
    //   <DataList.Item>
    //     <DataList.Label minWidth="88px">
    //       <Tooltip content="Protein">
    //         <Icons.Protein size={ICON_SIZE} />
    //       </Tooltip>
    //     </DataList.Label>
    //     <DataList.Value>
    //       <P size="2" weight="medium">
    //         {protein}
    //       </P>
    //     </DataList.Value>
    //   </DataList.Item>
    // </DataList.Root>
  );
}
