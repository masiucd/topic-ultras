import {DataList, Flex, Separator, Strong} from "@radix-ui/themes";

import type {FoodResult} from "@/persistence/food/types";
import {Icons} from "@/shared/components/icons";
import {Tooltip} from "@/shared/components/ui/tooltip";
import {P} from "@/shared/components/ui/typography";
import {cn} from "@/shared/lib/cn";

import {FoodTypeBadge} from "./foods/food-type-badge";

const ICON_SIZE = 18;

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
      <FoodTypeBadge className="absolute right-2 top-2" foodType={foodType} />
      <Flex direction="column" gap="1">
        <Strong>{foodName}</Strong>
        <Tooltip content="asd">
          <P size="2" truncate>
            {description}
          </P>
        </Tooltip>
      </Flex>
      <Separator my="1" size="4" />
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
    <DataList.Root>
      <DataList.Item>
        <DataList.Label minWidth="88px">
          <Tooltip content="Calories">
            <Icons.Calorie size={16} />
          </Tooltip>
        </DataList.Label>
        <DataList.Value>
          <P size="2" weight="medium">
            {calories}
          </P>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">
          <Tooltip content="Carbohydrates">
            <Icons.Carbs size={16} />
          </Tooltip>
        </DataList.Label>
        <DataList.Value>
          <P size="2" weight="medium">
            {carbs}
          </P>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">
          <Tooltip content="Total Fat">
            <Icons.Fat size={16} />
          </Tooltip>
        </DataList.Label>
        <DataList.Value>
          <P size="2" weight="medium">
            {totalFat}
          </P>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">
          <Tooltip content="Protein">
            <Icons.Protein size={16} />
          </Tooltip>
        </DataList.Label>
        <DataList.Value>
          <P size="2" weight="medium">
            {protein}
          </P>
        </DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
}
