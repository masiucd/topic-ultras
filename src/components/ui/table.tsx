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
import type {PropsWithChildren} from "react";

import {cn} from "@/lib/utils";

export function Table(props: RootProps) {
  return <RadixUiTable.Root variant="surface" {...props} />;
}

export function Header(props: HeaderProps) {
  return <RadixUiTable.Header {...props} />;
}
export function Row(props: RowProps) {
  return <RadixUiTable.Row {...props} />;
}
export function ColumnHeaderCell(props: ColumnHeaderCellProps) {
  return <RadixUiTable.ColumnHeaderCell {...props} />;
}

export function Body(props: BodyProps) {
  return <RadixUiTable.Body {...props} />;
}
export function RowHeaderCell(props: RowHeaderCellProps) {
  return <RadixUiTable.RowHeaderCell {...props} />;
}

export function Cell(props: CellProps) {
  return <RadixUiTable.Cell {...props} />;
}

export function TableCaption({
  children,
  className,
}: PropsWithChildren<{className?: string}>) {
  return (
    <caption
      className={cn(
        "absolute bottom-0 left-1/2 mb-2 -translate-x-1/2 text-sm font-bold opacity-40",
        className
      )}
    >
      {children}
    </caption>
  );
}
