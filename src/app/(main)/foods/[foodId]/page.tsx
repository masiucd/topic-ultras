import {redirect} from "next/navigation";

import {PageWrapper} from "@/_components/page-wrapper";
import {Badge} from "@/_components/ui/badge";
import {Icons} from "@/_components/ui/icons";
import {Link} from "@/_components/ui/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/_components/ui/table";
import {H1, P} from "@/_components/ui/typography";
import {ICON_SIZE} from "@/lib/constants";
import {getFoodRecordById} from "@/persistence/food/dao";
import type {FoodResult} from "@/persistence/food/types";

export default async function FoodSlugPage({
  params,
}: {
  params: {foodId: string};
}) {
  let foodItem = await getFoodRecordById(parseInt(params.foodId, 10));

  if (!foodItem.success) {
    return redirect("/404");
  }
  return (
    <PageWrapper>
      <H1 className="my-5 mb-10">{foodItem.data.foodName}</H1>
      <div className="max-w-2xl">
        <FoodItemTable foodItem={foodItem.data} />
      </div>
    </PageWrapper>
  );
}

function FoodItemTable({foodItem}: {foodItem: FoodResult}) {
  let {calories, carbs, totalFat, protein, foodType} = foodItem;
  return (
    <Table className="w-full">
      <TableCaption>
        <P>Nutritional information for {foodItem.foodName}</P>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="flex gap-1">
              <Icons.Calorie size={ICON_SIZE} />
              Calories
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-1">
              <Icons.Carbs size={ICON_SIZE} />
              Carbohydrates
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-1">
              <Icons.Fat size={ICON_SIZE} />
              Fat
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-1">
              <Icons.Protein size={ICON_SIZE} />
              <span>Protein</span>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-1">
              <Icons.Badge size={ICON_SIZE} />
              Type
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{calories}</TableCell>
          <TableCell>{carbs}</TableCell>
          <TableCell>{totalFat}</TableCell>
          <TableCell>{protein}</TableCell>
          <TableCell>
            <Link href={`/food-categories/${foodItem.foodType}`}>
              <Badge>{foodType}</Badge>
            </Link>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>
            <div className="flex gap-1">
              <Icons.Apple size={ICON_SIZE} />
              Foods
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
