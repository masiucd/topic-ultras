"use client";

import {Box, Button, Flex, RadioGroup, TextField} from "@radix-ui/themes";
import Link from "next/link";
import type {PropsWithChildren} from "react";
import {useFormState, useFormStatus} from "react-dom";

import {
  type FoodResult,
  getFoodResults,
  type Unit,
} from "@/actions/search-food-records";
import {Icons} from "@/shared/components/icons";
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
        <p>Search for a food item</p>
      )}
    </div>
  );
}

function FoodItem({food, unit}: {food: FoodResult; unit: Unit}) {
  let {foodName, description, calories, carbs, totalFat, protein} = food;
  return (
    <li className="flex flex-col gap-2 rounded-md border border-gray-900 px-2 py-3 shadow-md">
      <strong className="flex gap-2">
        <span>
          Nutrition Facts for{" "}
          <Link href={`/foods/${foodName}`}>{foodName}</Link> in{" "}
          <span className="font-semibold uppercase">{unit}</span>
        </span>
      </strong>

      <p>{description}</p>
      <p className="flex gap-3">
        <span>
          <Icons.Calorie />
        </span>
        <span>{calories}</span>
      </p>
      <p className="flex gap-3">
        <span>
          <Icons.Carbs />
        </span>
        <span>{carbs}</span>
      </p>
      <p className="flex gap-3">
        <span>
          <Icons.Fat />
        </span>
        <span> {totalFat}</span>
      </p>
      <p className="flex gap-3">
        <span>
          <Icons.Protein />
        </span>
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
          <Label htmlFor="food">Food</Label>
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

        {/* <Flex
          className="w-[22rem] border-4"
          align="center"
          justify="center"
          direction="row"
        > */}

        <SubmitButton>
          <span className="font-semibold capitalize">Search</span>
        </SubmitButton>

        {/* </Flex> */}
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
