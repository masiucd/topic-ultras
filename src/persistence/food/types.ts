import "server-only";

import {z} from "zod";

// Enum for food types
let foodTypeCategory = z.enum([
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

export type FoodTypeCategory = z.infer<typeof foodTypeCategory>;

export let foodResultSchema = z.object({
  foodId: z.number(),
  calories: z.number(),
  carbs: z.number(),
  description: z.string(),
  foodName: z.string(),
  lowerName: z.string(),
  protein: z.number(),
  totalFat: z.number(),
  foodType: foodTypeCategory.optional(), // since type_id is nullable
  foodTypeId: z.number().optional(), // since type_id is nullable
});

export type FoodResult = z.infer<typeof foodResultSchema>;

export let foodTypeCategorySchema = z.object({
  id: z.number(),
  name: foodTypeCategory,
});
export type FoodTypeCategorySchema = z.infer<typeof foodTypeCategorySchema>;

export let foodsByCategorySchema = z.object({
  foodId: z.number(),
  foodName: z.string(),
  description: z.string(),
});
