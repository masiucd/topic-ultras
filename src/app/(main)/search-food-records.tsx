"use client";

import type {PropsWithChildren} from "react";
import {useFormState, useFormStatus} from "react-dom";

import {Button} from "@/_components/ui/button";
import {Input} from "@/_components/ui/input";
import {P, Span} from "@/_components/ui/typography";
import {getFoodResults} from "@/actions/search-food-records";

import {FoodItem} from "./food-item";

export function SearchFoodRecords() {
  let [foodResult, action] = useFormState(getFoodResults, null);
  return (
    <div>
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
            <div className="my-3 max-w-[500px]">
              {/* TODO callout component */}
              <div>
                <P className="text-pretty">
                  Food <Span weight="bold">{foodResult.searchTerm}</Span> not
                  found
                </P>
                <P className="text-pretty">Try searching for something else</P>
              </div>
            </div>
          )}
        </>
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
      <fieldset className="flex h-[60px] w-[500px] items-center gap-1">
        <legend className="sr-only">Search for a food item</legend>
        <Input
          type="text"
          placeholder="Search for food"
          name="food"
          id="food"
          required
          // size="3"
          className="w-full"
        />

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
    <Button disabled={pending} type="submit" variant="default" color="gray">
      {children}
    </Button>
  );
}
