import {useAtom} from "jotai";
import type {PropsWithChildren} from "react";
import {Link} from "react-router";
import type {FoodItemData} from "~/.server/db/dao/food-items";
import {FoodCategory} from "~/components/food-category";
import {Checkbox} from "~/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "~/components/ui/table";
import type {Column} from "~/lib/constants";
import {cn} from "~/lib/utils";
import {selectedFoodItemsAtom} from "~/state/food-items/atoms";
import {SelectRows} from "./filters/rows";
import {Pagination} from "./pagination";
import {Header} from "./table-header";

export function FoodItems({
  page,
  totalPages,
  totalFoodItems,
  results,
  selectedColumns,
}: {
  page: number;
  totalPages: number;
  totalFoodItems: number;
  results: FoodItemData["results"];
  selectedColumns: Set<Column>;
}) {
  let [selectedFoodItems, setSelectedFoodItems] = useAtom(
    selectedFoodItemsAtom
  );

  // let  selectedColumns =  useAtomValue(selectedColumnsAtom);
  // let  [selectedColumns,setSelectedColumns] =  useAtom(selectedColumnsAtom);

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelectedFoodItems(results);
    } else {
      setSelectedFoodItems([]);
    }
  };

  const onCheckedChange = (
    checked: boolean,
    item: FoodItemData["results"][number]
  ) => {
    if (checked) {
      setSelectedFoodItems((prev) => {
        return [...prev, item];
      });
    } else {
      let newSelectedFoodItems = selectedFoodItems.filter(
        (selectedItem) => selectedItem.foodId !== item.foodId
      );
      setSelectedFoodItems(newSelectedFoodItems);
    }
  };

  return (
    <Table title="Food items table">
      <Header toggleAll={toggleAll} selectedColumns={selectedColumns} />
      <TableBody>
        {results.map((item) => (
          <TableRow key={item.foodId}>
            <TableCell>
              <Checkbox
                checked={selectedFoodItems.some(
                  (selectedItem) => selectedItem.foodId === item.foodId
                )}
                onCheckedChange={(checked) =>
                  onCheckedChange(Boolean(checked), item)
                }
              />
            </TableCell>

            <Cell visible={selectedColumns.has("name")}>
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
            </Cell>

            <Cell visible={selectedColumns.has("description")}>
              <TableCell>{item.foodDescription}</TableCell>
            </Cell>

            <Cell visible={selectedColumns.has("category")}>
              <TableCell>
                <FoodCategory withLink name={item.foodCategory?.name} />
              </TableCell>
            </Cell>
            <Cell visible={selectedColumns.has("calories")}>
              <TableCell>{item.nutrients?.calories ?? "N/A"}</TableCell>
            </Cell>

            <Cell visible={selectedColumns.has("protein")}>
              <TableCell>{item.nutrients?.protein ?? "N/A"}</TableCell>
            </Cell>

            <Cell visible={selectedColumns.has("fat")}>
              <TableCell>{item.nutrients?.fat ?? "N/A"}</TableCell>
            </Cell>

            <Cell visible={selectedColumns.has("carbs")}>
              <TableCell>{item.nutrients?.carbs ?? "N/A"}</TableCell>
            </Cell>
          </TableRow>
        ))}
      </TableBody>
      <Footer
        page={page}
        totalPages={totalPages}
        totalFoodItems={totalFoodItems}
        results={results}
      />
    </Table>
  );
}

function Cell({visible, children}: PropsWithChildren<{visible: boolean}>) {
  if (!visible) return null;
  return <>{children}</>;
}

function Footer(props: {
  page: number;
  totalPages: number;
  totalFoodItems: number;
  results: FoodItemData["results"];
}) {
  let {page, totalPages, totalFoodItems, results} = props;

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
            <Pagination page={page} totalPages={totalPages} />
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}
