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
import {selectedCategories} from "@/store/food-categories";
import {selectedFoodItems} from "@/store/food-items";
import {useAtom, useAtomValue} from "jotai";
import {Pagination} from "./pagination";

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
  let [value, setValue] = useAtom(selectedFoodItems);

  return (
    <Table>
      <TableCaption>
        <Span>List of food items available in the database</Span>
      </TableCaption>
      <Header
        foodItems={foodItems}
        setSelectedItems={(items) => setValue(items)}
      />
      <TableBody>
        {foodItems.map((foodItem) => {
          return (
            <TableRow key={foodItem.id}>
              <TableCell className="w-[10px]">
                <Checkbox
                  checked={value.includes(foodItem.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setValue((prev) => [...prev, foodItem.id]);
                    } else {
                      setValue((prev) => prev.filter((x) => x !== foodItem.id));
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
        selectedFoodItemIds={value}
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
  selectedFoodItemIds,
}: {
  page: number;
  amountOfPages: number;
  amountOfFoodItems: number;
  foodItems: FoodItem[];
  selectedFoodItemIds: number[];
}) {
  let categories = useAtomValue(selectedCategories);
  // let filtersApplied = categories.length > 0 || selectedFoodItemIds.length > 0;
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={2}>
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
        <TableCell colSpan={6}>
          <div className="flex flex-col gap-1">
            {categories.length > 0 && (
              <Span className="text-sm capitalize">
                Categories: {categories.join(", ")}
              </Span>
            )}
            {selectedFoodItemIds.length > 0 && (
              <Span className="text-sm capitalize">
                Selected: {selectedFoodItemIds.length}
              </Span>
            )}
          </div>
        </TableCell>
        <TableCell>
          <Pagination page={page} amountOfPages={amountOfPages} />
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}
