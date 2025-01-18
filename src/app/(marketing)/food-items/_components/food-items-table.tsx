import type {FoodItem} from "@/app/db/dao/food-items";
import {Span} from "@/components/typography";
import {Table, TableCaption} from "@/components/ui/table";
import {Body, Footer, Header} from "./table-components";

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
  return (
    <Table>
      <TableCaption>
        <Span>List of food items available in the database</Span>
      </TableCaption>
      <Header foodItems={foodItems} />
      <Body foodItems={foodItems} />
      <Footer
        page={page}
        amountOfPages={amountOfPages}
        amountOfFoodItems={amountOfFoodItems}
        foodItems={foodItems}
      />
    </Table>
  );
}
