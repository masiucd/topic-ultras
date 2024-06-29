import {DataList, Flex} from "@radix-ui/themes";

import type {FoodResult} from "@/persistence/food/types";
import {Icons} from "@/shared/components/icons";
import {Tooltip} from "@/shared/components/ui/tooltip";
import {P, Span} from "@/shared/components/ui/typography";
import type {Unit} from "@/shared/schemas/unit";

import {FoodTypeBadge} from "./foods/food-type-badge";

export function FoodItem({food, unit}: {food: FoodResult; unit: Unit}) {
  let {foodName, description, calories, carbs, totalFat, protein, foodType} =
    food;
  return (
    <li className="relative flex flex-col gap-2 rounded-md border border-gray-900 px-2 py-3 shadow-md">
      <FoodTypeBadge className="absolute right-2 top-2" foodType={foodType} />
      <Flex direction="column" gap="1">
        <P>{foodName}</P>
        <P wrap="pretty">{description}</P>
      </Flex>
      <DataList.Root>
        <DataList.Item>
          <DataList.Label minWidth="88px">
            <Tooltip content="Calories">
              <Icons.Calorie size={16} />
            </Tooltip>
          </DataList.Label>
          <DataList.Value>{calories}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">
            <Tooltip content="Carbohydrates">
              <Icons.Carbs size={16} />
            </Tooltip>
          </DataList.Label>
          <DataList.Value>
            <Span>{carbs}</Span>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">
            <Tooltip content="Total Fat">
              <Icons.Fat size={16} />
            </Tooltip>
          </DataList.Label>
          <DataList.Value>
            <Span>{totalFat}</Span>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">
            <Tooltip content="Protein">
              <Icons.Protein size={16} />
            </Tooltip>
          </DataList.Label>
          <DataList.Value>
            <Span>{protein}</Span>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </li>
  );
}
