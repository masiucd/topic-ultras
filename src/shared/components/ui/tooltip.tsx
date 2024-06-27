import {Tooltip as RadixTooltip, type TooltipProps} from "@radix-ui/themes";

export function Tooltip(props: TooltipProps) {
  return <RadixTooltip {...props}>{props.children}</RadixTooltip>;
}
