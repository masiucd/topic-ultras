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
<<<<<<< HEAD
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
=======
    <Card asChild size="2" variant="surface">
      <li className={cn("relative", className)}>
        <FoodTypeBadge className="absolute right-2 top-2" foodType={foodType} />
        <Flex direction="column" gap="1">
          <Link href={`/foods/${slugify(food.foodName)}`}>
            <Strong>{foodName}</Strong>
          </Link>
          <Tooltip content="asd">
            <P size="2" truncate>
              {description}
            </P>
          </Tooltip>
        </Flex>
        <Separator my="2" size="4" />

        <DataList.Root>
          <DataList.Item>
            <DataList.Label minWidth="88px">
              <Tooltip content="Calories">
                <Icons.Calorie size={ICON_SIZE} />
              </Tooltip>
            </DataList.Label>
            <DataList.Value>{calories}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">
              <Tooltip content="Carbohydrates">
                <Icons.Carbs size={ICON_SIZE} />
              </Tooltip>
            </DataList.Label>
            <DataList.Value>
              <Span>{carbs}</Span>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">
              <Tooltip content="Total Fat">
                <Icons.Fat size={ICON_SIZE} />
              </Tooltip>
            </DataList.Label>
            <DataList.Value>
              <Span>{totalFat}</Span>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">
              <Tooltip content="Protein">
                <Icons.Protein size={ICON_SIZE} />
              </Tooltip>
            </DataList.Label>
            <DataList.Value>
              <Span>{protein}</Span>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </li>
    </Card>
>>>>>>> da14c94 (Refactor food-item component to use consistent URL format)
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
