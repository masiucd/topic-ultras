"use client";

import {Button} from "@radix-ui/themes";
import Link from "next/link";
import type {PropsWithChildren} from "react";
import {useFormState, useFormStatus} from "react-dom";

import {
  type FoodResult,
  getFoodResults,
  type Unit,
} from "@/actions/search-food-records";
import {Icons} from "@/shared/components/icons";

// TODO save state in url params
export function SearchFoodRecords() {
  let [foodResult, action] = useFormState(getFoodResults, null);
  console.log("🚀 ~ SearchFoodRecords ~ foodResult:", foodResult);
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
            <p>Food {foodResult.searchTerm} not found</p>
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
        <span className="font-semibold capitalize">Search</span>
      </SubmitButton>
    </form>
  );
}

function SubmitButton({children}: PropsWithChildren) {
  let {pending} = useFormStatus();
  return (
    <Button disabled={pending} type="submit" variant="solid">
      {children}
    </Button>
    // <button
    //   // isDisabled={pending}
    //   disabled={pending}
    //   className={cn("font-semibold capitalize", className)}
    //   type="submit"
    // >
    //   {children}

    // </button>
  );
}
