import {useSearchParams} from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {Span} from "~/components/ui/typography";
import {DEFAULT_FOOD_ITEMS_ROWS} from "~/lib/constants";

export function SelectRows(props: {totalFoodItems: number}) {
  let [searchParams, setSearchParams] = useSearchParams();
  let rows = searchParams.get("rows") ?? DEFAULT_FOOD_ITEMS_ROWS;
  return (
    <div className="mr-3 flex flex-1 items-center justify-end gap-3 ">
      <Span>Rows per page</Span>
      <Select
        name="rows"
        onValueChange={(value) => {
          let params = new URLSearchParams(searchParams);
          params.set("rows", value);
          setSearchParams(params, {preventScrollReset: true});
        }}
      >
        <SelectTrigger className="h-7 w-[60px]">
          <SelectValue placeholder={rows} />
        </SelectTrigger>
        <SelectContent>
          {makeRowValues(props.totalFoodItems).map((p) => (
            <SelectItem key={p} value={p.toString()}>
              {p}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function makeRowValues(totalFoodItems: number) {
  let xs = [];
  for (let i = 2; i < totalFoodItems; i += 2) {
    xs.push(i);
  }
  return xs;
}
