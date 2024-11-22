import {Form, Link, type Location, useSubmit} from "@remix-run/react";
import {useState} from "react";
import type {FoodItemData} from "~/.server/db/dao/food-items";
import {FoodCategory} from "~/components/food-category";
import {Checkbox} from "~/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {cn} from "~/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {Span} from "../ui/typography";
import {Pagination} from "./pagination";

export function FoodItems(props: {
  page: number;
  totalPages: number;
  totalFoodItems: number;
  rows: number;
  results: FoodItemData["results"];
  location: Location;
}) {
  let {page, totalPages, totalFoodItems, rows, results, location} = props;
  let [selectedFoodItems, setSelectedFoodItems] = useState<Set<number>>(
    new Set()
  );
  return (
    <Table title="Food items table">
      <TableCaption>Food Items in the Database.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]">
            <Checkbox
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedFoodItems((p) => {
                    let newSet = new Set(p);
                    for (const item of results) {
                      newSet.add(item.foodId);
                    }
                    return newSet;
                  });
                } else {
                  setSelectedFoodItems(new Set());
                }
              }}
            />
          </TableHead>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead className="w-[300px]">Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Calories</TableHead>
          <TableHead>Protein</TableHead>
          <TableHead>Fat</TableHead>
          <TableHead>Carbs</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((item) => (
          <TableRow key={item.foodId}>
            <TableCell>
              <Checkbox
                checked={selectedFoodItems.has(item.foodId)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedFoodItems((p) => {
                      let newSet = new Set(p);
                      newSet.add(item.foodId);
                      return newSet;
                    });
                  } else {
                    setSelectedFoodItems((p) => {
                      let newSet = new Set(p);
                      newSet.delete(item.foodId);
                      return newSet;
                    });
                  }
                }}
              />
            </TableCell>
            <TableCell>
              <Link
                className={cn(
                  item.slug
                    ? "underline hover:no-underline hover:opacity-50"
                    : "pointer-events-none opacity-80"
                )}
                to={`/food-items/${item.slug}`}
              >
                {item.foodName}
              </Link>
            </TableCell>
            <TableCell>{item.foodDescription}</TableCell>
            <TableCell>
              <FoodCategory withLink name={item.foodCategory?.name} />
            </TableCell>
            <TableCell>{item.nutrients?.calories ?? "N/A"}</TableCell>
            <TableCell>{item.nutrients?.protein ?? "N/A"}</TableCell>
            <TableCell>{item.nutrients?.fat ?? "N/A"}</TableCell>
            <TableCell>{item.nutrients?.carbs ?? "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <Footer
        page={page}
        totalPages={totalPages}
        totalFoodItems={totalFoodItems}
        rows={rows}
        results={results}
        location={location}
      />
    </Table>
  );
}

function Footer(props: {
  page: number;
  totalPages: number;
  totalFoodItems: number;
  rows: number;
  results: FoodItemData["results"];
  location: Location;
}) {
  let {page, totalPages, totalFoodItems, rows, results, location} = props;
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={3}>
          <div className="flex gap-5">
            <span>
              Page {page} / {totalPages}
            </span>
            <span>
              {page === totalPages
                ? totalFoodItems
                : (page - 1) * results.length + results.length}{" "}
              of {totalFoodItems} food items
            </span>
          </div>
        </TableCell>
        <TableCell colSpan={5}>
          <div className="flex items-center ">
            <div className="mr-3 flex flex-1 items-center justify-end gap-3 ">
              <Span>Rows per page</Span>
              <SelectRows rows={rows} totalFoodItems={totalFoodItems} />
            </div>

            <Pagination
              page={page}
              location={location}
              totalPages={totalPages}
            />
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}

function SelectRows(props: {rows: number; totalFoodItems: number}) {
  let submit = useSubmit();
  // TODO: Can we remove the form and cookie and use the url to store the rows?
  return (
    <Form
      method="post"
      id="rows"
      onChange={(e) => {
        submit(e.currentTarget);
      }}
    >
      <fieldset className="flex flex-row-reverse items-center gap-2">
        <Select name="rows">
          <SelectTrigger className="h-7 w-[60px]">
            <SelectValue placeholder={props.rows} />
          </SelectTrigger>
          <SelectContent>
            {makeRowValues(props.totalFoodItems).map((p) => (
              <SelectItem key={p} value={p.toString()}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </fieldset>
    </Form>
  );
}

function makeRowValues(totalFoodItems: number) {
  let xs = [];
  for (let i = 2; i < totalFoodItems; i += 2) {
    xs.push(i);
  }
  return xs;
}
