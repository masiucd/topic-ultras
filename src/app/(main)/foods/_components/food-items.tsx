import Link from "next/link";
import type {PropsWithChildren} from "react";

import {P, Span, Strong} from "@/components/typography";
import {Badge} from "@/components/ui/badge";
import {FoodTypeBadge} from "@/components/ui/food-type-badge";
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

import {
  type FoodItem,
  getFoodItemsData,
  ITEMS_PER_PAGE,
} from "../_data/food-items";
import type {FoodType} from "../food-types/_data/food-types";
import {Pagination} from "./pagination";
import {SearchFood} from "./search-food";

type Props = {
  foodName: string;
  page: number;
};

// TODO cache search results
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
        <Head />
        <Body foodItems={foodItems} />
        <Footer
          totalFoodItems={foodItems.length}
          totalFoods={totalFoods}
          currentPage={currentPage}
          totalPages={totalPages}
        >
          <Pagination page={page} totalPages={totalPages} />
        </Footer>
      </Table>
    </div>
  );
}

function Head() {
  return (
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
  );
}

function Body({foodItems}: {foodItems: FoodItem[]}) {
  return (
    <TableBody>
      {foodItems.map((foodItem) => (
        <TableRow key={foodItem.foodId}>
          <TableCell>
            <Link
              href={`/foods/${foodItem.slug}`}
              className="hover:underline hover:opacity-60"
            >
              <Strong className="capitalize">{foodItem.foodName} </Strong>
            </Link>
          </TableCell>
          <TableCell>
            <FoodTypeBadge name={foodItem.foodType.name} />
          </TableCell>
          <TableCell>
            <P>{foodItem.data.calories}</P>
          </TableCell>
          <TableCell>
            <Strong>{foodItem.data.carbs}</Strong>
          </TableCell>
          <TableCell>
            <Strong>{foodItem.data.protein}</Strong>
          </TableCell>
          <TableCell>
            <Strong>{foodItem.data.fat}</Strong>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

function Footer({
  totalFoodItems,
  totalFoods,
  currentPage,
  totalPages,
  children,
}: PropsWithChildren<{
  totalFoodItems: number;
  totalFoods: number;
  currentPage: number;
  totalPages: number;
}>) {
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={5}>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <Span className="italic">Total</Span>
              <Span className="italic">
                {totalFoodItems}/{totalFoods} items
              </Span>
            </div>
            <Span>
              Page {currentPage} of {totalPages}
            </Span>
          </div>
        </TableCell>
        {children}
      </TableRow>
    </TableFooter>
  );
}
