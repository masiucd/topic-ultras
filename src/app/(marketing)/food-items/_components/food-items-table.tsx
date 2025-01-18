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
import type {Column} from "@/lib/constants";
import {cn} from "@/lib/utils";
import {foodItemTableColumnsAtom} from "@/store/columns";
import {selectedCategories} from "@/store/food-categories";
import {foodItemsAtom} from "@/store/food-items";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
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
  let [value, setValue] = useAtom(foodItemsAtom);
  let columns = useAtomValue(foodItemTableColumnsAtom);

  return (
    <Table>
      <TableCaption>
        <Span>List of food items available in the database</Span>
      </TableCaption>
      <Header
        foodItems={foodItems}
        setSelectedItems={(items) => setValue(items)}
        columns={columns}
      />
      <TableBody>
        {foodItems.map((foodItem) => (
          <RowItem
            key={foodItem.id}
            foodItem={foodItem}
            foodItems={value}
            columns={columns}
          />
        ))}
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

function RowItem({
  foodItem,
  foodItems,
  columns,
}: {
  foodItem: FoodItem;
  foodItems: number[];
  columns: Set<Column>;
}) {
  let setValue = useSetAtom(foodItemsAtom);
  return (
    <TableRow>
      <TableCell className="w-[10px]">
        <Checkbox
          checked={foodItems.includes(foodItem.id)}
          onCheckedChange={(checked) => {
            if (checked) {
              setValue((prev) => [...prev, foodItem.id]);
            } else {
              setValue((prev) => prev.filter((x) => x !== foodItem.id));
            }
          }}
        />
      </TableCell>
      {columns.has("name") && (
        <TableCell className="w-[200px]">
          <Span className="font-semibold">{foodItem.name}</Span>
        </TableCell>
      )}
      {columns.has("description") && (
        <TableCell className="max-w-[350px] truncate">
          {foodItem.description}
        </TableCell>
      )}
      {columns.has("category") && (
        <TableCell>
          <Badge className="capitalize">{foodItem.foodCateGory}</Badge>
        </TableCell>
      )}
      {columns.has("calories") && (
        <TableCell>{foodItem.nutrients?.calories ?? "N/A"}</TableCell>
      )}
      {columns.has("protein") && (
        <TableCell>{foodItem.nutrients?.protein ?? "N/A"}</TableCell>
      )}
      {columns.has("fat") && (
        <TableCell>{foodItem.nutrients?.fat ?? "N/A"}</TableCell>
      )}
      {columns.has("carbs") && (
        <TableCell>{foodItem.nutrients?.carbs ?? "N/A"}</TableCell>
      )}
    </TableRow>
  );
}

function Header({
  foodItems,
  setSelectedItems,
  columns,
}: {
  foodItems: FoodItem[];
  setSelectedItems: (items: number[]) => void;
  columns: Set<Column>;
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
        {Array.from(columns).map((column) => (
          <TableHead
            key={column}
            className={cn("capitalize", column === "name" && "w-[100px]")}
          >
            {column}
          </TableHead>
        ))}
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
