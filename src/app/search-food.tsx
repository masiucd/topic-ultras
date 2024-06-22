"use client";
import type {PropsWithChildren} from "react";
import {useFormState, useFormStatus} from "react-dom";

import {
  type ReturnTypeOfFetchFoodNutrition,
  searchFood,
} from "@/actions/search-food";
import {cn} from "@/lib/cn";
import {Button} from "@/shared/components/ui/button";

// TODO save state in url params
export function SearchFood() {
  let [foodResult, action] = useFormState(searchFood, null);
  return (
    <div>
      <div>SearchFood</div>
      <FoodForm action={action} />
      {foodResult !== null ? (
        <SearchFootItem foodResult={foodResult} />
      ) : (
        <p>Search for a food item</p>
      )}
    </div>
  );
}

function SearchFootItem({
  foodResult,
}: {
  foodResult: Awaited<ReturnTypeOfFetchFoodNutrition>;
}) {
  if (foodResult.result) {
    return (
      <div>
        <p>{foodResult.result.foods.name}</p>
        <p>{foodResult.result.foods.description}</p>
        <p>{foodResult.result.nutrients.name}</p>
        <p>{foodResult.result.units.conversionFactor}</p>
        <p>{foodResult.result.units.name}</p>
        <p>{foodResult.result.units.conversionFactor}</p>
        <p>{foodResult.result.foodNutrients.amount}</p>
      </div>
    );
  }
  return (
    <div>
      <p>
        There was no result for <strong>{foodResult.search}</strong>.
      </p>
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
    <form
      action={action}
      className="flex flex-col border border-blue-400 md:w-full md:max-w-xl"
    >
      <input
        type="text"
        datatype="text"
        placeholder="Search for food"
        name="food"
        required
      />
      <div>
        <label htmlFor="g">g</label>
        <input type="radio" name="unit" value="g" id="g" />

        <label htmlFor="oz">oz</label>
        <input type="radio" name="unit" value="oz" id="oz" />
      </div>

      <div>
        <label htmlFor="amount">
          <span>amount</span>
        </label>
        <input type="number" name="amount" id="amount" />
      </div>
      <SubmitButton>
        <span>search</span>
      </SubmitButton>
    </form>
  );
}

type SubmitButtonProps = {
  className?: string;
};
function SubmitButton({
  className,
  children,
}: PropsWithChildren<SubmitButtonProps>) {
  let {pending} = useFormStatus();
  return (
    <Button
      isDisabled={pending}
      className={cn("font-semibold capitalize", className)}
      type="submit"
    >
      {children}
    </Button>
  );
}
