import {Badge, type BadgeVariant} from "@/_components/ui/badge";
import type {FoodTypeCategory} from "@/persistence/food/types";

type Props = {
  foodType: FoodTypeCategory;
  className?: string;
  variant?: BadgeVariant;
};

export function FoodTypeBadge({foodType, className, variant}: Props) {
  return (
    <Badge className={className} variant={variant}>
      {foodType}
    </Badge>
  );
}
