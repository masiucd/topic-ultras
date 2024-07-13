"use client";

import {Box, Flex, TextField} from "@radix-ui/themes";
import type {PropsWithChildren} from "react";
import {useFormState, useFormStatus} from "react-dom";

import {getFoodResults} from "@/actions/search-food-records";
import Button from "@/shared/components/button";
import {Callout} from "@/shared/components/callout";
import {P, Span} from "@/shared/components/typography";

import {FoodItem} from "./food-item";

export function SearchFoodRecords() {
  let [foodResult, action] = useFormState(getFoodResults, null);
  return (
    <Box p="1">
      <FoodForm action={action} />
      {foodResult !== null && (
        <>
          {foodResult.result.length > 0 ? (
            <ul className="mt-3 grid grid-cols-1 gap-1 p-3 sm:grid-cols-2 md:grid-cols-3">
              {foodResult.result.map((food) => (
                <FoodItem key={food.foodId} food={food} className="w-56" />
              ))}
            </ul>
          ) : (
            <Flex maxWidth="500px" my="3">
              <Callout variant="soft" type="info" size="1">
                <P wrap="pretty">
                  Food <Span weight="bold">{foodResult.searchTerm}</Span> not
                  found
                </P>
                <P wrap="pretty">Try searching for something else</P>
              </Callout>
            </Flex>
          )}
        </>
      )}
    </Box>
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
      <Flex align="center" height="60px" width="500px" gap="1">
        <TextField.Root
          type="text"
          placeholder="Search for food"
          name="food"
          id="food"
          required
          size="3"
          className="w-full"
        />

        <SubmitButton>
          <span className="font-semibold capitalize">Search</span>
        </SubmitButton>
      </Flex>
      {/* 
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
        </Box> */}
    </form>
  );
}

function SubmitButton({children}: PropsWithChildren) {
  let {pending} = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      variant="solid"
      size="3"
      highContrast
      color="gray"
    >
      {children}
    </Button>
  );
}
