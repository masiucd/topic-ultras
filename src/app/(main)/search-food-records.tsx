"use client";

import {
  Box,
  Button,
  Flex,
  RadioGroup,
  Strong,
  TextField,
} from "@radix-ui/themes";
import Link from "next/link";
import type {PropsWithChildren} from "react";
import {useFormState, useFormStatus} from "react-dom";

import {
  type FoodResult,
  getFoodResults,
  type Unit,
} from "@/actions/search-food-records";
import {Icons} from "@/shared/components/icons";
import {Tooltip} from "@/shared/components/ui/tooltip";
import {Label, P, Span} from "@/shared/components/ui/typography";

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
  let {foodName, description, calories, carbs, totalFat, protein} = food;
  return (
    <li className="flex flex-col gap-2 rounded-md border border-gray-900 px-2 py-3 shadow-md">
      <Strong className="flex gap-2">
        <span>
          Nutrition Facts for{" "}
          <Link href={`/foods/${foodName}`}>{foodName}</Link> in{" "}
          <span className="font-semibold uppercase">{unit}</span>
        </span>
      </Strong>

      <P>{description}</P>
      <P className="flex gap-3">
        <Tooltip content="Calories">
          <span>
            <Icons.Calorie />
          </span>
        </Tooltip>
        <span>{calories}</span>
      </P>
      <p className="flex gap-3">
        <Tooltip content="Carbohydrates">
          <span>
            <Icons.Carbs />
          </span>
        </Tooltip>
        <span>{carbs}</span>
      </p>
      <p className="flex gap-3">
        <Tooltip content="Total Fat">
          <span>
            <Icons.Fat />
          </span>
        </Tooltip>
        <span> {totalFat}</span>
      </p>
      <p className="flex gap-3">
        <Tooltip content="Protein">
          <span>
            <Icons.Protein />
          </span>
        </Tooltip>
        <span>{protein}</span>
      </p>
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
