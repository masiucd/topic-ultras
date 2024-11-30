export const DEFAULT_FOOD_ITEMS_ROWS = 8;
export const DEFAULT_COLUMNS = [
  "name",
  "description",
  "category",
  "calories",
  "protein",
  "fat",
  "carbs",
] as const;
export type Column = (typeof DEFAULT_COLUMNS)[number];
