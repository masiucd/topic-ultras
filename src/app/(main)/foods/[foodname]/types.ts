import type {getFoodItemByName} from "./_data/food-item";

export type FoodItem = NonNullable<
  Awaited<ReturnType<typeof getFoodItemByName>>
>;
