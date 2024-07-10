import {Badge, type BadgeProps} from "@radix-ui/themes";

import type {FoodTypeCategory} from "@/persistence/food/types";
import {Tooltip} from "@/shared/components/ui/tooltip";
import {Span} from "@/shared/components/ui/typography";

type Color = Pick<BadgeProps, "color">["color"];
function getBadgeColor(foodType?: FoodTypeCategory): Color {
  switch (foodType) {
    case "Fruit":
      return "grass";
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

type Props = {
  foodType: FoodTypeCategory;
  className?: string;
  size?: "1" | "2" | "3";
  tooltipContent?: string; // Add tooltipContent property
};

// Base type without `disableTooltip` or with `disableTooltip` set to false
type WithTooltip = {
  disableTooltip?: false;
  tooltipContent: string;
};

// Type for when `disableTooltip` is true, excluding `tooltipContent`
type WithoutTooltip = {
  disableTooltip: true;
};

// Conditional type that combines both cases
type TooltipConditional = WithTooltip | WithoutTooltip;

export function FoodTypeBadge({
  foodType,
  className,
  size,
  disableTooltip = false,
  tooltipContent,
}: Props & TooltipConditional) {
  let color = getBadgeColor(foodType);
  return (
    <Badge variant="soft" color={color} className={className} size={size}>
      {disableTooltip ? (
        <Span className="uppercase">{foodType ?? "N/A"}</Span>
      ) : (
        <Tooltip content={tooltipContent}>
          <Span className="uppercase">{foodType ?? "N/A"}</Span>
        </Tooltip>
      )}
    </Badge>
  );
}
