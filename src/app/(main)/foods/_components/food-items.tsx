import {eq, like, sql} from "drizzle-orm";
import {alias} from "drizzle-orm/pg-core";
import Link from "next/link";

import {P, Span, Strong} from "@/components/typography";
import {Badge} from "@/components/ui/badge";
import {Icons} from "@/components/ui/icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Tooltip} from "@/components/ui/tooltip";
import {db} from "@/db";
import {foodNutrients, foods, foodTypes} from "@/db/schema";

import type {FoodType} from "../_data/food-types";
import {Pagination} from "./pagination";
import {SearchFood} from "./search-food";

const ITEMS_PER_PAGE = 3; // TODO increase

type Props = {
  foodName: string;
  page: number;
};

async function getFoodItemsData(
  query: string,
  perPage = ITEMS_PER_PAGE,
  skip = 0
) {
  try {
    return await db.transaction(async (tx) => {
      let ft = alias(foodTypes, "foodType");
      let f = alias(foods, "food");

      if (query === "") {
        let foodItems = await tx
          .select({
            foodId: f.id,
            foodName: f.name,
            foodType: {name: ft.name, id: ft.id},
            data: {
              calories: foodNutrients.calories,
              fat: foodNutrients.fat,
              protein: foodNutrients.protein,
              carbs: foodNutrients.carbs,
            },
          })
          .from(f)
          .innerJoin(ft, eq(f.typeId, ft.id))
          .innerJoin(foodNutrients, eq(f.id, foodNutrients.foodId))
          .limit(perPage)
          .offset(skip);
        let totalFoods = await tx
          .select({total: sql`count(*)`.mapWith(Number)})
          .from(foods);

        return {foodItems, totalFoods: totalFoods[0].total};
      }
      let foodItems = await tx
        .select({
          foodId: f.id,
          foodName: f.name,
          foodType: {name: ft.name, id: ft.id},
          data: {
            calories: foodNutrients.calories,
            fat: foodNutrients.fat,
            protein: foodNutrients.protein,
            carbs: foodNutrients.carbs,
          },
        })
        .from(f)
        .innerJoin(ft, eq(f.typeId, ft.id))
        .innerJoin(foodNutrients, eq(f.id, foodNutrients.foodId))
        .limit(perPage)
        .offset(skip)
        .where(like(f.name, `%${query}%`));
      let totalFoods = await tx
        .select({total: sql`count(*)`.mapWith(Number)})
        .from(foods);
      return {foodItems, totalFoods: totalFoods[0].total};
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {foodItems: [], totalFoods: 0};
  }
}

export async function FoodItems({foodName, page}: Props) {
  let {foodItems, totalFoods} = await getFoodItemsData(
    foodName,
    ITEMS_PER_PAGE,
    (page - 1) * ITEMS_PER_PAGE // skip items based on page number
  );

  let totalPages = Math.ceil(totalFoods / ITEMS_PER_PAGE);
  let currentPage = page > totalPages ? totalPages : page;
  return (
    <div>
      <div className="mb-5 mt-3">
        <SearchFood foodName={foodName} />
      </div>
      <Table>
        <TableCaption>
          List of food items available in the database
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">
              <Tooltip content="Food name">
                <Icons.Food />
              </Tooltip>
            </TableHead>
            <TableHead>
              <Tooltip content="Food type">
                <Icons.Label />
              </Tooltip>
            </TableHead>
            <TableHead>
              <Tooltip content="Calories in food item">
                <Icons.Calories />
              </Tooltip>
            </TableHead>
            <TableHead>
              <Tooltip content="Carbs">
                <Icons.Carbs />
              </Tooltip>
            </TableHead>
            <TableHead>
              <Tooltip content="Protein">
                <Icons.Protein />
              </Tooltip>
            </TableHead>
            <TableHead>
              <Tooltip content="Total fat">
                <Icons.Fat />
              </Tooltip>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {foodItems.map((x) => (
            <TableRow key={x.foodId}>
              <TableCell>
                <Link href="/" className="hover:underline hover:opacity-60">
                  <Strong className="capitalize">{x.foodName}</Strong>
                </Link>
              </TableCell>
              <TableCell>
                <FoodTypeBadge foodType={x.foodType} />
              </TableCell>
              <TableCell>
                <P>{x.data.calories}</P>
              </TableCell>
              <TableCell>
                <Strong>{x.data.carbs}</Strong>
              </TableCell>
              <TableCell>
                <Strong>{x.data.protein}</Strong>
              </TableCell>
              <TableCell>
                <Strong>{x.data.fat}</Strong>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <Span className="italic">Total</Span>
                  <Span className="italic">
                    {foodItems.length}/{totalFoods} items
                  </Span>
                </div>
                <Span>
                  Page {currentPage} of {totalPages}
                </Span>
              </div>
            </TableCell>
            <Pagination page={page} totalPages={totalPages} />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

function FoodTypeBadge({foodType}: {foodType: FoodType}) {
  return (
    <Link href="/">
      <Badge className="uppercase">{foodType.name}</Badge>
    </Link>
  );
}
