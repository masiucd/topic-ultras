import {useAtom, useAtomValue} from "jotai";
import type {PropsWithChildren, ReactNode} from "react";
import {Icons} from "~/components/icons";
import {Button} from "~/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {List} from "~/components/ui/typography";
import {type Column, DEFAULT_COLUMNS} from "~/lib/constants";
import {selectedColumnsAtom} from "~/state/food-items/atoms";
import {Checkbox} from "../ui/checkbox";

export function ColumnView() {
  let [selectedColumns, setSelectedColumns] = useAtom(selectedColumnsAtom);

  let selectColumn = (column: Column, checked: boolean) => {
    setSelectedColumns((prev) => {
      let newSet = new Set(prev);
      if (checked) {
        newSet.add(column);
      } else {
        newSet.delete(column);
      }
      return newSet;
    });
  };
  let toggleAllColumns = (checked: boolean) => {
    if (checked) {
      setSelectedColumns(new Set(DEFAULT_COLUMNS));
    } else {
      setSelectedColumns(new Set());
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-1" variant="outline">
          <Icons.Settings />
          Columns view
          <Icons.UpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[12rem]">
        <List className="flex list-none flex-col gap-3 capitalize">
          <ColumnViewItem
            selectColumn={selectColumn}
            column={DEFAULT_COLUMNS[0]}
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            column={DEFAULT_COLUMNS[1]}
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            column={DEFAULT_COLUMNS[2]}
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            column={DEFAULT_COLUMNS[3]}
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            column={DEFAULT_COLUMNS[4]}
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            column={DEFAULT_COLUMNS[5]}
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            column={DEFAULT_COLUMNS[6]}
          />
          <AllColumnItem
            checked={selectedColumns.size === DEFAULT_COLUMNS.length}
            toggleAllColumns={toggleAllColumns}
          />
        </List>
      </PopoverContent>
    </Popover>
  );
}

function ColumnViewItem({
  selectColumn,
  column,
}: {
  selectColumn: (column: Column, checked: boolean) => void;
  column: Column;
}) {
  let selectedColumns = useAtomValue(selectedColumnsAtom);
  return (
    <ListItem>
      <ListItemLabel htmlFor={column}>{column}</ListItemLabel>
      <Checkbox
        id={column}
        onCheckedChange={(checked) => {
          selectColumn(column, Boolean(checked));
        }}
        checked={selectedColumns.has(column)}
      />
    </ListItem>
  );
}

function AllColumnItem({
  toggleAllColumns,
  checked,
}: {
  toggleAllColumns: (checked: boolean) => void;
  checked: boolean;
}) {
  return (
    <>
      <ListItem>
        <ListItemLabel htmlFor="all">all</ListItemLabel>
        <Checkbox
          id="all"
          onCheckedChange={(checked) => {
            toggleAllColumns(Boolean(checked));
          }}
          checked={checked}
        />
      </ListItem>
    </>
  );
}

function ListItem({children}: {children: ReactNode}) {
  return (
    <li className="flex items-center justify-between border-b pb-1">
      {children}
    </li>
  );
}

function ListItemLabel({
  children,
  htmlFor,
}: PropsWithChildren<{htmlFor: string}>) {
  return (
    <label
      htmlFor={htmlFor}
      className="cursor-pointer font-medium text-sm leading-none hover:opacity-70 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  );
}
