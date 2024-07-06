"use server";
import "server-only";

import {getFoodsDetailsByName} from "@/persistence/food/dao";

export async function getFoodResults(
  _prevState: null | Awaited<ReturnTypeOfFetchFoodNutrition>,
  formData: FormData,
) {
  let food = formData.get("food");
  // let unit = formData.get("unit");
  // let amount = formData.get("amount");

  if (typeof food !== "string") {
    throw new Error("Expected food to be a string.");
  }
  // if (typeof unit !== "string") {
  //   throw new Error("Expected unit to be a string.");
  // }

  return await getFoodData(food);
}

export type GetFood = typeof getFoodResults;

async function getFoodData(food: string) {
  let result = await getFoodsDetailsByName(food);

  if (result.success) {
    return {
      result: result.data,
      searchTerm: food,
      error: null,
      // unit,
    };
  }
  return {
    result: [],
    searchTerm: food,
    error: result.error,
    // unit,
  };
}

export type ReturnTypeOfFetchFoodNutrition = ReturnType<typeof getFoodData>;

// const GRAMS_TO_OUNCES = 3.5274;
// const GRAMS_IN_100G = 100;
// in DB everything is defaulting to 100 grams
// so we need to calculate the nutrition based on the amount and unit
// function calculateNutrionBasedOnAmountAndUnit(
//   foodNutrition: FoodResult,
//   amount: number,
//   unit: Unit,
// ) {
//   let {calories, carbs, protein, totalFat} = foodNutrition;
//   if (unit === "g") {
//     return {
//       calories: calories * (amount / GRAMS_IN_100G),
//       carbs: carbs * (amount / GRAMS_IN_100G),
//       protein: protein * (amount / GRAMS_IN_100G),
//       totalFat: totalFat * (amount / GRAMS_IN_100G),
//     };
//   }
//   if (unit === "oz") {
//     return {
//       calories: calories * (amount / GRAMS_TO_OUNCES),
//       carbs: carbs * (amount / GRAMS_TO_OUNCES),
//       protein: protein * (amount / GRAMS_TO_OUNCES),
//       totalFat: totalFat * (amount / GRAMS_TO_OUNCES),
//     };
//   }
// }
