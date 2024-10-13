import {Badge} from "./ui/badge";

export function FoodTypeBadge({foodType}: {foodType: FoodType}) {
  return <Badge className="uppercase">{foodType}</Badge>;
}
export function FoodCategoryBadge({foodCategory}: {foodCategory: string}) {
  return <Badge className="uppercase">{foodCategory}</Badge>;
}
