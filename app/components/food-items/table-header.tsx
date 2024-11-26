import {Link, useLocation} from "@remix-run/react";
import type {PropsWithChildren} from "react";
import {Checkbox} from "~/components/ui/checkbox";
import {TableHead, TableHeader, TableRow} from "~/components/ui/table";

export function Header(props: {toggleAll: (checked: boolean) => void}) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[10px]">
          <Checkbox onCheckedChange={props.toggleAll} />
        </TableHead>
        <TableHead className="w-[200px]">
          <TableHeadLink header="name">Name</TableHeadLink>
        </TableHead>
        <TableHead className="w-[300px]">
          <TableHeadLink header="description">Description</TableHeadLink>
        </TableHead>
        <TableHead>
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
        </TableHead>
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
