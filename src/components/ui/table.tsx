import {Table as RadixUiTable} from "@radix-ui/themes";
import type {
  BodyProps,
  CellProps,
  ColumnHeaderCellProps,
  HeaderProps,
  RootProps,
  RowHeaderCellProps,
  RowProps,
} from "@radix-ui/themes/dist/esm/components/table.js";

import {cn} from "@/lib/utils";

export function Table(props: RootProps) {
  return <RadixUiTable.Root {...props} />;
}

export function Header(props: HeaderProps) {
  return <RadixUiTable.Header {...props} />;
}

export function Body(props: BodyProps) {
  return <RadixUiTable.Body {...props} />;
}

export function Cell(props: CellProps) {
  return <RadixUiTable.Cell {...props} />;
}
export function ColumnHeader(props: ColumnHeaderCellProps) {
  return <RadixUiTable.ColumnHeaderCell {...props} />;
}

export function Row(props: RowProps) {
  return <RadixUiTable.Row {...props} />;
}
export function RowHeaderCell(props: RowHeaderCellProps) {
  return <RadixUiTable.RowHeaderCell {...props} />;
}
