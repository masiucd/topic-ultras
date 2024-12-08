import {Link} from "react-router";
import {cn} from "~/lib/utils";
import {Badge, type BadgeVariant} from "./ui/badge";

type Props = {
  name?: string;
  className?: string;
  variant?: BadgeVariant;
  withLink?: boolean;
};

export function FoodCategory({withLink, name, variant, className}: Props) {
  if (withLink) {
    return (
      <Link to={`/food-categories/${name?.toLowerCase()}`}>
        <Badge className={cn("uppercase", className)} variant={variant}>
          {name ?? "N/A"}
        </Badge>
      </Link>
    );
  }
  return (
    <Badge className={cn("uppercase", className)} variant={variant}>
      {name ?? "N/A"}
    </Badge>
  );
}
