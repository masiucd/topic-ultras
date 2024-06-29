import "server-only";

import {z} from "zod";

export let foodResultSchema = z.object({
  foodId: z.number(),
  calories: z.number(),
  carbs: z.number(),
  description: z.string(),
  foodName: z.string(),
  lowerName: z.string(),
  protein: z.number(),
  totalFat: z.number(),
});

export type FoodResult = z.infer<typeof foodResultSchema>;
