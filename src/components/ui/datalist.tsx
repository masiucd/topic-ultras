import {DataList as RadixDataList} from "@radix-ui/themes";
import type {
  ItemProps,
  LabelProps,
  RootProps,
} from "@radix-ui/themes/dist/esm/components/data-list.js";

export function DataList(props: RootProps) {
  return <RadixDataList.Root {...props} />;
}

function Item(props: ItemProps) {
  return <RadixDataList.Item {...props} />;
}
function Label(props: LabelProps) {
  return <RadixDataList.Label {...props} />;
}
function Value(props: LabelProps) {
  return <RadixDataList.Value {...props} />;
}

DataList.Item = Item;
DataList.Label = Label;
DataList.Value = Value;
