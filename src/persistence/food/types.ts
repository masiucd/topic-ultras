import "server-only";

import {z} from "zod";

let foodTypeEnum = z.enum([
  "Fruit",
  "Vegetable",
  "Grain",
  "Protein",
  "Dairy",
  "Fat",
  "Sweets",
  "Beverage",
  "Other",
  "fish",
]);

export type FoodType = z.infer<typeof foodTypeEnum>;

export let foodResultSchema = z.object({
  foodId: z.number(),
  calories: z.number(),
  carbs: z.number(),
  description: z.string(),
  foodName: z.string(),
  lowerName: z.string(),
  protein: z.number(),
  totalFat: z.number(),
  foodType: foodTypeEnum.optional(), // since type_id is nullable
  foodTypeId: z.number().optional(), // since type_id is nullable
});

export type FoodResult = z.infer<typeof foodResultSchema>;
