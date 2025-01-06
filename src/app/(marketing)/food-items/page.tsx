import {db} from "@/app/db";
import {foodItems} from "@/app/db/schema";
import PageWrapper from "@/components/page-wrapper";
import {H1} from "@/components/typography";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function getFoodItems() {
  let rows = await db
    .select({
      id: foodItems.id,
      name: foodItems.name,
      description: foodItems.description,
    })
    .from(foodItems);
  return rows;
}

export default async function FoodItemsPage() {
  let foodItems = await getFoodItems();
  console.log("foodItems", foodItems);
  return (
    <PageWrapper>
      <H1>Food Items</H1>

      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {foodItems.map((foodItem) => {
              return (
                <TableRow key={foodItem.id}>
                  <TableCell>{foodItem.name}</TableCell>
                  <TableCell>{foodItem.description}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </PageWrapper>
  );
}
