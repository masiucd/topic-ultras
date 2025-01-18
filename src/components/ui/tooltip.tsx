"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import {cn} from "@/lib/utils";
import type {PropsWithChildren, ReactNode} from "react";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

type Props = {
  className?: string;
  sideOffset?: number;
} & React.ComponentProps<typeof TooltipPrimitive.Content>;

const TooltipContent = ({className, sideOffset = 4, ref, ...props}: Props) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 animate-in overflow-hidden rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-xs data-[state=closed]:animate-out",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
);

export function TooltipComponent(
  props: PropsWithChildren<{content: ReactNode; disabled?: boolean}>
) {
  if (props.disabled) {
    return <>{props.children}</>;
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent>{props.content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {Tooltip, TooltipTrigger, TooltipContent, TooltipProvider};
