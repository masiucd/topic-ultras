import {cn} from "~/lib/utils";
import {Badge, type BadgeVariant} from "./ui/badge";

type Props = {
  name?: string;
  className?: string;
  variant?: BadgeVariant;
};

export function FoodCategory(props: Props) {
  return (
    <Badge className={cn("uppercase", props.className)} variant={props.variant}>
      {props.name ?? "N/A"}
    </Badge>
  );
}
