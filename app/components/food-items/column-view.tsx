import type {PropsWithChildren, ReactNode} from "react";
import {Icons} from "~/components/icons";
import {Button} from "~/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {List} from "~/components/ui/typography";
import {type Column, DEFAULT_COLUMNS} from "~/lib/constants";
import {Checkbox} from "../ui/checkbox";

export function ColumnView({
  selectColumn,
  selectedColumns,
  toggleAllColumns,
}: {
  selectColumn: (column: Column, checked: boolean) => void;
  selectedColumns: Set<Column>;
  toggleAllColumns: (checked: boolean) => void;
}) {
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
            selectedColumns={selectedColumns}
            column="name"
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            selectedColumns={selectedColumns}
            column="description"
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            selectedColumns={selectedColumns}
            column="category"
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            selectedColumns={selectedColumns}
            column="calories"
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            selectedColumns={selectedColumns}
            column="protein"
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            selectedColumns={selectedColumns}
            column="fat"
          />
          <ColumnViewItem
            selectColumn={selectColumn}
            selectedColumns={selectedColumns}
            column="carbs"
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
  selectedColumns,
  column,
}: {
  selectColumn: (column: Column, checked: boolean) => void;
  selectedColumns: Set<Column>;
  column: Column;
}) {
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
