"use client";

import {Box, Button, Flex, RadioGroup, TextField} from "@radix-ui/themes";
import type {PropsWithChildren} from "react";
import {useFormState, useFormStatus} from "react-dom";

import {getFoodResults} from "@/actions/search-food-records";
import {Label, P, Span} from "@/shared/components/ui/typography";

import {FoodItem} from "./food-item";

export function SearchFoodRecords({children}: PropsWithChildren) {
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
        children
      )}
    </div>
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
    <Button disabled={pending} type="submit" variant="soft" size="3">
      {children}
    </Button>
  );
}
