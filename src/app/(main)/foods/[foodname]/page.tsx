import {H1} from "@/components/typography";

export default function FoodNamePage({
  params: {foodname},
}: {
  params: {foodname: string};
}) {
  return (
    <div>
      <H1>{foodname}</H1>
    </div>
  );
}
