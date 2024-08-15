import type {SlotProps} from "@radix-ui/react-slot";
import {TextField} from "@radix-ui/themes";
import type {RootProps} from "@radix-ui/themes/dist/esm/components/text-field.js";

export function Input(props: RootProps) {
  return (
    <TextField.Root type="text" {...props}>
      {props.children}
    </TextField.Root>
  );
}

export function Slot(props: SlotProps) {
  return <TextField.Slot>{props.children}</TextField.Slot>;
}
