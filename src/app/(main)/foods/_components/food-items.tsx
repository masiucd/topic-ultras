import Link from "next/link";
import {type PropsWithChildren} from "react";

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

import type {FoodItem} from "../_data/food-items";
import type {FoodType} from "../_data/food-types";

type Props = {
  footItems: FoodItem[];
};

export function FoodItems({footItems}: PropsWithChildren<Props>) {
  return (
    <>
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
          {footItems.map((x) => (
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
            <TableCell colSpan={5} className="space-x-2">
              <Span className="italic">Total</Span>
              <Span className="italic">{footItems.length}</Span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2 ">
                <Link href="/">Prev</Link>
                <Link href="/">Next</Link>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}

function FoodTypeBadge({foodType}: {foodType: FoodType}) {
  return (
    <Link href="/">
      <Badge className="uppercase">{foodType.name}</Badge>
    </Link>
  );
}
