import {FoodCategoryBadge} from "@/components/food-badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {TooltipComponent} from "@/components/ui/tooltip";
import {Muted} from "@/components/ui/typography";
import {cn} from "@/lib/utils";
import Link from "next/link";

import {getFoodItems} from "@/db/dao/food-item";
import {Footer} from "./footer";

const ITEMS_PER_PAGE = 5;

export async function FoodTable(props: {
  name: string;
  searchParams: Record<string, string>;
}) {
  let {name, searchParams} = props;
  let limit = Number.parseInt(searchParams.limit, 10) || ITEMS_PER_PAGE;
  let skip = Number.parseInt(searchParams.skip, 10) || 0;
  let {totalFoodItems, allFoodItems} = await getFoodItems({name, limit, skip});
  return (
    <Table>
      <TableCaption>
        <Muted>Food items stored in the database</Muted>
        <Muted>All food items is calculated per 100g</Muted>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Food item</TableHead>
          <TableHead className="w-[250px]">Description</TableHead>
          <TableHead className="w-[160px]">Category</TableHead>
          <TableHead className="w-[80px]">Calories</TableHead>
          <TableHead className="w-[80px]">Protein</TableHead>
          <TableHead className="w-[80px]">Fat</TableHead>
          <TableHead className="w-[80px]">Carbs</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allFoodItems.map((foodItem) => (
          <TableRowItem key={foodItem.foodId} foodItem={foodItem} />
        ))}
      </TableBody>
      <Footer
        skip={skip}
        limit={limit}
        totalFoodItems={totalFoodItems}
        searchParams={searchParams}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </Table>
  );
}

function TableRowItem(props: {
  foodItem: Awaited<ReturnType<typeof getFoodItems>>["allFoodItems"][number];
}) {
  let {foodItem} = props;
  return (
    <TableRow key={foodItem.foodId}>
      <TableCell>
        <Link
          aria-label={
            foodItem.slug ? `View ${foodItem.foodName}` : "Not available"
          }
          href={`/food-items/${foodItem.slug}`}
          className={cn(
            "capitalize underline underline-offset-3 hover:opacity-60",
            !foodItem.slug &&
              "pointer-events-none cursor-not-allowed no-underline "
          )}
        >
          {foodItem.foodName}
        </Link>
      </TableCell>
      <TableCell>
        <TooltipComponent content={foodItem.foodDescription}>
          <p className="max-w-[250px] truncate">{foodItem.foodDescription}</p>
        </TooltipComponent>
      </TableCell>

      <TableCell>
        <FoodCategoryBadge foodCategory={foodItem.foodCategory} withLink />
      </TableCell>
      <TableCell>{foodItem.nutrients?.calories ?? "NA"}</TableCell>
      <TableCell>{foodItem.nutrients?.protein ?? "NA"}</TableCell>
      <TableCell>{foodItem.nutrients?.fat ?? "NA"}</TableCell>
      <TableCell>{foodItem.nutrients?.carbs ?? "NA"}</TableCell>
    </TableRow>
  );
}
