"use client";
import type {FoodItem} from "@/app/db/dao/food-items";
import {Span} from "@/components/typography";
import {Badge} from "@/components/ui/badge";
import {Checkbox} from "@/components/ui/checkbox";
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
import {useState} from "react";
import {FirstPage, LastPage, NextPage, PreviousPage} from "./paggination";

export function FoodItemsTable({
  foodItems,
  page,
  amountOfPages,
  amountOfFoodItems,
}: {
  foodItems: FoodItem[];
  page: number;
  amountOfPages: number;
  amountOfFoodItems: number;
}) {
  let [selectedItems, setSelectedItems] = useState<number[]>([]);
  return (
    <Table>
      <TableCaption>List of food items available in the database</TableCaption>
      <Header foodItems={foodItems} setSelectedItems={setSelectedItems} />
      <TableBody>
        {foodItems.map((foodItem) => {
          return (
            <TableRow key={foodItem.id}>
              <TableCell className="w-[10px]">
                <Checkbox
                  checked={selectedItems.includes(foodItem.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedItems([...selectedItems, foodItem.id]);
                    } else {
                      setSelectedItems(
                        selectedItems.filter((x) => x !== foodItem.id)
                      );
                    }
                  }}
                />
              </TableCell>
              <TableCell className="w-[200px]">
                <Span className="font-semibold">{foodItem.name}</Span>
              </TableCell>
              <TableCell className="max-w-[350px] truncate">
                {foodItem.description}
              </TableCell>
              <TableCell>
                <Badge className="capitalize">{foodItem.foodCateGory}</Badge>
              </TableCell>
              <TableCell>{foodItem.nutrients?.calories ?? "N/A"}</TableCell>
              <TableCell>{foodItem.nutrients?.protein ?? "N/A"}</TableCell>
              <TableCell>{foodItem.nutrients?.fat ?? "N/A"}</TableCell>
              <TableCell>{foodItem.nutrients?.carbs ?? "N/A"}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <Footer
        page={page}
        amountOfPages={amountOfPages}
        amountOfFoodItems={amountOfFoodItems}
        foodItems={foodItems}
      />
    </Table>
  );
}

function Header({
  foodItems,
  setSelectedItems,
}: {
  foodItems: FoodItem[];
  setSelectedItems: (items: number[]) => void;
}) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[10px]">
          <Checkbox
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedItems(foodItems.map((x) => x.id));
              } else {
                setSelectedItems([]);
              }
            }}
          />
        </TableHead>
        <TableHead className="w-[100px]">Name</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Calories</TableHead>
        <TableHead>Protein</TableHead>
        <TableHead>Fat</TableHead>
        <TableHead>Carbs</TableHead>
      </TableRow>
    </TableHeader>
  );
}

function Footer({
  page,
  amountOfPages,
  amountOfFoodItems,
  foodItems,
}: {
  page: number;
  amountOfPages: number;
  amountOfFoodItems: number;
  foodItems: FoodItem[];
}) {
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={7}>
          <div className="flex flex-col gap-2">
            <div>
              Total{" "}
              {page === amountOfPages
                ? amountOfFoodItems
                : foodItems.length * page}{" "}
              / {amountOfFoodItems} food items
            </div>
            <div>
              Page {page} of {amountOfPages}
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex justify-end gap-2 ">
            <FirstPage page={page} />
            <PreviousPage page={page} />
            <NextPage page={page} amountOfPages={amountOfPages} />
            <LastPage page={page} amountOfPages={amountOfPages} />
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}
