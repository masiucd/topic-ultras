import {Callout as RadixCallout} from "@radix-ui/themes";
import type {
	// IconProps,
	RootProps,
	// TextProps,
} from "@radix-ui/themes/dist/esm/components/callout.js";

import {Icons} from "./icons";

type Props = {
	type: "info" | "warning" | "error";
};

export function Callout(props: Props & RootProps) {
	return (
		<RadixCallout.Root
			variant="soft"
			color={props.type === "info" ? "blue" : props.type === "warning" ? "yellow" : "red"}
			{...props}
		>
			<RadixCallout.Icon>
				<Icons.Info
					size={
						props.size === "1"
							? 20
							: props.size === "2"
								? 24
								: props.size === "3"
									? 28
									: 32
					}
				/>
			</RadixCallout.Icon>
			<RadixCallout.Text>{props.children}</RadixCallout.Text>
		</RadixCallout.Root>
	);
}

// function Icon(props: IconProps) {
//   return <RadixCallout.Icon {...props} />;
// }
// function Text(props: TextProps) {
//   return <RadixCallout.Text {...props} />;
// }
