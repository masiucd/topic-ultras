import {Badge} from "@/_components/ui/badge";
import {Tooltip} from "@/_components/ui/tooltip";
import {P} from "@/_components/ui/typography";
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
      return "orange";
    case "Sweets":
      return "pink";
    case "Beverage":
      return "cyan";
    case "Other":
      return "gray";
    case "fish":
      return "blue";
    case "meat":
      return "red";
    default:
      return "gray";
  }
}

type Props = {
  foodType: FoodTypeCategory;
  className?: string;
  size?: "1" | "2" | "3";
  tooltipContent?: string; // Add tooltipContent property
  highContrast?: boolean;
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
  highContrast,
}: Props & TooltipConditional) {
  let color = getBadgeColor(foodType);
  return (
    <Badge
      // highContrast={highContrast}
      // variant="soft"
      color={color}
      className={className}
      // size={size}
    >
      {disableTooltip ? (
        <P className="uppercase">{foodType ?? "N/A"}</P>
      ) : (
        <Tooltip content={tooltipContent}>
          <P className="uppercase">{foodType ?? "N/A"}</P>
        </Tooltip>
      )}
    </Badge>
  );
}
