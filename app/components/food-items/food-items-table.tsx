import {Link, type Location} from "@remix-run/react";
import {useState} from "react";
import type {FoodItemData} from "~/.server/db/dao/food-items";
import {FoodCategory} from "~/components/food-category";
import {Checkbox} from "~/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {cn} from "~/lib/utils";
import {SelectRows} from "./filters/rows";
import {Pagination} from "./pagination";

export function FoodItems(props: {
  page: number;
  totalPages: number;
  totalFoodItems: number;
  results: FoodItemData["results"];
  location: Location;
}) {
  let {page, totalPages, totalFoodItems, results, location} = props;
  let [selectedFoodItems, setSelectedFoodItems] = useState<Set<number>>(
    new Set()
  );

  const toggleAll = (checked: boolean) => {
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
  };

  const onCheckedChange = (
    checked: boolean,
    item: FoodItemData["results"][number]
  ) => {
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
  };

  return (
    <Table title="Food items table">
      <Header toggleAll={toggleAll} />
      <TableBody>
        {results.map((item) => (
          <TableRow key={item.foodId}>
            <TableCell>
              <Checkbox
                checked={selectedFoodItems.has(item.foodId)}
                onCheckedChange={(checked) =>
                  onCheckedChange(Boolean(checked), item)
                }
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
        results={results}
        location={location}
      />
    </Table>
  );
}

function Header(props: {toggleAll: (checked: boolean) => void}) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[10px]">
          <Checkbox onCheckedChange={props.toggleAll} />
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
  );
}

function Footer(props: {
  page: number;
  totalPages: number;
  totalFoodItems: number;
  results: FoodItemData["results"];
  location: Location;
}) {
  let {page, totalPages, totalFoodItems, results, location} = props;

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
            <SelectRows totalFoodItems={totalFoodItems} />
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
