import {useLoaderData} from "@remix-run/react";
import {db} from "~/.server/db";
import {foodItems} from "~/.server/db/schema";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {H1, List} from "~/components/ui/typography";

export async function loader() {
  let results = await db.select().from(foodItems);
  return results;
}

export default function FoodItemsRoute() {
  let results = useLoaderData<typeof loader>();
  return (
    <div>
      <H1>Food Items</H1>
      <List>
        {results.map((result) => {
          return (
            <li key={result.id}>
              <p>{result.name}</p>
              <p>{result.description}</p>
            </li>
          );
        })}
      </List>

      <div className="max-w-[65rem]">
        <Table>
          <TableCaption>Food Items in the Database.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Calories</TableHead>
              <TableHead>Protein</TableHead>
              <TableHead>Fat</TableHead>
              <TableHead>Carbs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Chicken</TableCell>
              <TableCell>Grilled chicken breast</TableCell>
              <TableCell>Meat</TableCell>
              <TableCell>100</TableCell>
              <TableCell>20</TableCell>
              <TableCell>5</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
