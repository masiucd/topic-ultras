import {Select as RadixSelect} from "@radix-ui/themes";
import type {
	ContentProps,
	GroupProps,
	ItemProps,
	LabelProps,
	RootProps,
	SeparatorProps,
	TriggerProps,
} from "@radix-ui/themes/dist/esm/components/select.js";

export function Select(props: RootProps) {
	return <RadixSelect.Root {...props} />;
}

function Trigger(props: TriggerProps) {
	return <RadixSelect.Trigger {...props} />;
}

function Content(props: ContentProps) {
	return <RadixSelect.Content {...props} />;
}

function Label(props: LabelProps) {
	return <RadixSelect.Label {...props} />;
}

function Item(props: ItemProps) {
	return <RadixSelect.Item {...props} />;
}

function Group(props: GroupProps) {
	return <RadixSelect.Group {...props} />;
}

function Separator(props: SeparatorProps) {
	return <RadixSelect.Separator {...props} />;
}

Select.Trigger = Trigger;
Select.Content = Content;
Select.Label = Label;
Select.Item = Item;
Select.Group = Group;
Select.Separator = Separator;
