"use client";

import {
  Box,
  Button,
  DataList,
  Flex,
  RadioGroup,
  TextField,
} from "@radix-ui/themes";
import type {PropsWithChildren} from "react";
import {useFormState, useFormStatus} from "react-dom";

import {getFoodResults} from "@/actions/search-food-records";
import {type FoodResult} from "@/persistence/food/types";
import {Icons} from "@/shared/components/icons";
import {Tooltip} from "@/shared/components/ui/tooltip";
import {Label, P, Span} from "@/shared/components/ui/typography";
import type {Unit} from "@/shared/schemas/unit";

import {FoodTypeBadge} from "./foods/food-type-badge";

export function SearchFoodRecords() {
  let [foodResult, action] = useFormState(getFoodResults, null);
  return (
    <div className="w-full max-w-3xl border-4">
      <FoodForm action={action} />
      {foodResult !== null ? (
        <>
          {foodResult.result.length > 0 ? (
            <ul className="mt-3 flex max-w-2xl flex-wrap gap-5">
              {foodResult.result.map((food) => (
                <FoodItem
                  key={food.foodId}
                  food={food}
                  unit={foodResult.unit}
                />
              ))}
            </ul>
          ) : (
            <P>Food {foodResult.searchTerm} not found</P>
          )}
        </>
      ) : (
        <Box
          my="5"
          className="flex flex-col gap-2 rounded-md border-2 border-gray-900 bg-gray-200 px-2 py-3 shadow-md md:w-96"
        >
          <P weight="medium">
            Please search for a food to get nutrition facts.
          </P>
        </Box>
      )}
    </div>
  );
}

function FoodItem({food, unit}: {food: FoodResult; unit: Unit}) {
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

function FoodForm({
  action,
}: {
  // eslint-disable-next-line no-unused-vars
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action}>
      <fieldset className="flex flex-col gap-3 rounded-md border border-gray-900 px-2 py-3 md:w-full md:max-w-xl">
        <legend>
          <Span size="4" weight="bold">
            Search for food
          </Span>
        </legend>

        <Box>
          <Label weight="medium" htmlFor="food">
            Food
          </Label>
          <TextField.Root
            type="text"
            placeholder="Search for food"
            name="food"
            id="food"
            required
          />
        </Box>

        <Box>
          <RadioGroup.Root defaultValue="g" name="unit" size="2">
            <Flex direction="row" gap="3">
              <RadioGroup.Item value="g" id="g">
                <Label weight="medium" htmlFor="g">
                  Grams
                </Label>
              </RadioGroup.Item>
              <RadioGroup.Item value="oz" id="oz">
                <Label weight="medium" htmlFor="oz">
                  Ounces
                </Label>
              </RadioGroup.Item>
            </Flex>
          </RadioGroup.Root>
        </Box>

        <SubmitButton>
          <span className="font-semibold capitalize">Search</span>
        </SubmitButton>
      </fieldset>
    </form>
  );
}

function SubmitButton({children}: PropsWithChildren) {
  let {pending} = useFormStatus();
  return (
    // TODO make facade for Button
    <Button disabled={pending} type="submit" variant="soft" size="3">
      {children}
    </Button>
  );
}
