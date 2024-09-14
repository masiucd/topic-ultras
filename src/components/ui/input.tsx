import type {SlotProps} from "@radix-ui/react-slot";
import {TextField} from "@radix-ui/themes";
import type {RootProps} from "@radix-ui/themes/dist/esm/components/text-field.js";
import {forwardRef} from "react";

export const Input = forwardRef<HTMLInputElement, RootProps>((props, ref) => {
	return (
		<TextField.Root type="text" {...props} ref={ref}>
			{props.children}
		</TextField.Root>
	);
});

Input.displayName = "Input";

export function Slot(props: SlotProps) {
	return <TextField.Slot>{props.children}</TextField.Slot>;
}
