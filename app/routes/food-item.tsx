import {H1} from "~/components/ui/typography";
import type {Route} from "./+types/food-item";

export default function FoodItemRoute({params}: Route.ComponentProps) {
  console.log("params", params);
  return (
    <div>
      <H1>Food Item - {params["food-item"]}</H1>
    </div>
  );
}
