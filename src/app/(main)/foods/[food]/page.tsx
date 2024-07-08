import {H1} from "@/shared/components/ui/typography";

export default function FoodItemPage({
  params,
}: {
  params: {
    food: string;
  };
}) {
  return <H1>{params.food}</H1>;
}
