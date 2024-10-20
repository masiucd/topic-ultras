import type {FoodType} from "@/db/schema/food-items";
import {Badge} from "./ui/badge";

export function FoodTypeBadge({foodType}: {foodType: FoodType | null}) {
  return <Badge className="uppercase">{foodType ?? "UNKNOWN"}</Badge>;
}
export function FoodCategoryBadge({
  foodCategory,
}: {
  foodCategory: string | null;
}) {
  return <Badge className="uppercase">{foodCategory ?? "UNKNOWN"}</Badge>;
}
