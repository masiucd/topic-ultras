import {cn} from "@/lib/utils";
import type {PropsWithChildren} from "react";
import {Span} from "../typography";

type Props = {
	className?: string;
};

export function Highlight(props: PropsWithChildren<Props>) {
	return (
		<Span
			className={cn(
				"relative rounded-sm after:absolute after:bottom-1 after:left-0 after:h-2 after:w-full after:rotate-2 after:bg-gray-700/20 after:transition-transform after:content-['']",
				props.className,
			)}
		>
			{props.children}
		</Span>
	);
}
