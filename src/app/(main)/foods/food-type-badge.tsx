import {Badge, type BadgeVariant} from "@/_components/ui/badge";
import type {FoodTypeCategory} from "@/persistence/food/types";

type Color =
  | "grass"
  | "green"
  | "yellow"
  | "blue"
  | "purple"
  | "orange"
  | "pink"
  | "cyan"
  | "gray"
  | "red";
function getBadgeColor(foodType?: FoodTypeCategory): Color {
  switch (foodType) {
    case "FRUIT":
      return "grass";
    case "VEGETABLE":
      return "green";
    case "GRAIN":
      return "yellow";
    case "PROTEIN":
      return "blue";
    case "DAIRY":
      return "purple";
    case "FAT":
      return "orange";
    case "SWEETS":
      return "pink";
    case "BEVERAGE":
      return "cyan";
    case "OTHER":
      return "gray";
    case "FISH":
      return "blue";
    case "MEAT":
      return "red";
    default:
      return "gray";
  }
}

type Props = {
  foodType: FoodTypeCategory;
  className?: string;
  variant?: BadgeVariant;
};

export function FoodTypeBadge({foodType, className, variant}: Props) {
  let color = getBadgeColor(foodType);
  return (
    <Badge color={color} className={className} variant={variant}>
      {foodType}
    </Badge>
  );
}
