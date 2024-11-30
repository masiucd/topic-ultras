import type {PropsWithChildren} from "react";
import {Link, useLocation} from "react-router";
import {Checkbox} from "~/components/ui/checkbox";
import {TableHead, TableHeader, TableRow} from "~/components/ui/table";

export function Header({
  toggleAll,
  selectedColumns,
}: {
  toggleAll: (checked: boolean) => void;
  selectedColumns: Set<string>;
}) {
  return (
    <TableHeader>
      <TableRow>
        {selectedColumns.has("name") && (
          <TableHead className="w-[10px]">
            <Checkbox onCheckedChange={toggleAll} />
          </TableHead>
        )}

        {selectedColumns.has("name") && (
          <TableHead className="w-[200px]">
            <TableHeadLink header="name">Name</TableHeadLink>
          </TableHead>
        )}

        {selectedColumns.has("description") && (
          <TableHead className="w-[300px]">
            <TableHeadLink header="description">Description</TableHeadLink>
          </TableHead>
        )}

        {selectedColumns.has("category") && (
          <TableHead>
            <TableHeadLink header="category">Category</TableHeadLink>
          </TableHead>
        )}

        {selectedColumns.has("calories") && (
          <TableHead>
            <TableHeadLink header="calories">Calories</TableHeadLink>
          </TableHead>
        )}

        {selectedColumns.has("protein") && (
          <TableHead>
            <TableHeadLink header="protein">Protein</TableHeadLink>
          </TableHead>
        )}

        {selectedColumns.has("fat") && (
          <TableHead>
            <TableHeadLink header="fat">Fat</TableHeadLink>
          </TableHead>
        )}

        {selectedColumns.has("carbs") && (
          <TableHead>
            <TableHeadLink header="carbs">Carbs</TableHeadLink>
          </TableHead>
        )}

        {/* <TableHead>
          <TableHeadLink header="category">Category</TableHeadLink>
        </TableHead>
        <TableHead>
          <TableHeadLink header="calories">Calories</TableHeadLink>
        </TableHead>
        <TableHead>
          <TableHeadLink header="protein">Protein</TableHeadLink>
        </TableHead>
        <TableHead>
          <TableHeadLink header="fat">Fat</TableHeadLink>
        </TableHead>
        <TableHead>
          <TableHeadLink header="carbs">Carbs</TableHeadLink>
        </TableHead> */}
      </TableRow>
    </TableHeader>
  );
}

function TableHeadLink(
  props: PropsWithChildren<{
    header:
      | "name"
      | "description"
      | "category"
      | "calories"
      | "protein"
      | "fat"
      | "carbs";
  }>
) {
  let {search} = useLocation();
  let searchParams = new URLSearchParams(search);
  let to = "/food-items";
  switch (props.header) {
    case "name":
      searchParams.set("sort", "name");
      to = `/food-items?${searchParams.toString()}`;
      break;
    case "description":
      searchParams.set("sort", "description");
      to = `/food-items?${searchParams.toString()}`;
      break;
    case "category":
      searchParams.set("sort", "category");
      to = `/food-items?${searchParams.toString()}`;
      break;
    case "calories":
      searchParams.set("sort", "calories");
      to = `/food-items?${searchParams.toString()}`;
      break;
    case "protein":
      searchParams.set("sort", "protein");
      to = `/food-items?${searchParams.toString()}`;
      break;
    case "fat":
      searchParams.set("sort", "fat");
      to = `/food-items?${searchParams.toString()}`;
      break;
    case "carbs":
      searchParams.set("sort", "carbs");
      to = `/food-items?${searchParams.toString()}`;
      break;
    default:
      break;
  }
  return (
    <Link to={to} className="flex items-center justify-between">
      {props.children}
    </Link>
  );
}
