export const COLUMNS = [
  "name",
  "description",
  "category",
  "calories",
  "protein",
  "fat",
  "carbs",
] as const;

export type Column = (typeof COLUMNS)[number];
