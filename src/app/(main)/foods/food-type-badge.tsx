import {Badge, type BadgeProps} from "@radix-ui/themes";

import type {FoodType} from "@/persistence/food/types";
import {Tooltip} from "@/shared/components/ui/tooltip";
import {Span} from "@/shared/components/ui/typography";

type Color = Pick<BadgeProps, "color">["color"];
function getBadgeColor(foodType?: FoodType): Color {
  switch (foodType) {
    case "Fruit":
      return "orange";
    case "Vegetable":
      return "green";
    case "Grain":
      return "yellow";
    case "Protein":
      return "blue";
    case "Dairy":
      return "purple";
    case "Fat":
      return "red";
    case "Sweets":
      return "pink";
    case "Beverage":
      return "cyan";
    case "Other":
      return "gray";
    case "fish":
      return "blue";
    default:
      return "gray";
  }
}

export function FoodTypeBadge({
  foodType,
  className,
}: {
  foodType?: FoodType;
  className?: string;
}) {
  let color = getBadgeColor(foodType);
  return (
    <Badge variant="soft" color={color} className={className}>
      <Tooltip content="Food Type">
        <Span className="uppercase">{foodType ?? "N/A"}</Span>
      </Tooltip>
    </Badge>
  );
}
