import {Link} from "@remix-run/react";
import {cn} from "~/lib/utils";
import {Badge, type BadgeVariant} from "./ui/badge";

type Props = {
  name?: string;
  className?: string;
  variant?: BadgeVariant;
  withLink?: boolean;
};

export function FoodCategory(props: Props) {
  if (props.withLink) {
    return (
      <Link to={`/food-categories/${props.name}`}>
        <Badge
          className={cn("uppercase", props.className)}
          variant={props.variant}
        >
          {props.name ?? "N/A"}
        </Badge>
      </Link>
    );
  }
  return (
    <Badge className={cn("uppercase", props.className)} variant={props.variant}>
      {props.name ?? "N/A"}
    </Badge>
  );
}
