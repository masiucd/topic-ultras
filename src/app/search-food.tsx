"use client";
import type {PropsWithChildren} from "react";
import {useFormState, useFormStatus} from "react-dom";

import {cn} from "@/lib/cn";
import {Button} from "@/shared/components/ui/button";
import {getFoodResults} from "@/actions/search-food";

// TODO save state in url params
export function GetFood() {
  let [foodResult, action] = useFormState(getFoodResults, null);
  console.log("🚀 ~ GetFood ~ foodResult:", foodResult);
  return (
    <div>
      <div>GetFood</div>
      <FoodForm action={action} />
      {/* {foodResult !== null ? (
        <div>
          {foodResult.result ? (
            <div>
              <p>{foodResult.result.food_name}</p>
              <p>{foodResult.result.nutrient_name}</p>
              <p>{foodResult.result.amount_in_grams}</p>
              <p>{foodResult.result.amount_in_ounces}</p>
              <p>{foodResult.result.unit}</p>
            </div>
          ) : (
            <p>Food not found</p>
          )}
        </div>
      ) : (
        <p>Search for a food item</p>
      )} */}
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
        <input type="radio" name="unit" value="g" id="g" defaultChecked />

        <label htmlFor="oz">oz</label>
        <input type="radio" name="unit" value="oz" id="oz" />
      </div>

      <div>
        <label htmlFor="amount">
          <span>amount</span>
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          defaultValue={100}
          min={0}
          max={10000}
        />
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
