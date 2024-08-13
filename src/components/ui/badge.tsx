import {cva, type VariantProps} from "class-variance-authority";
import * as React from "react";

import {cn} from "@/lib/utils";

const badgeVariants = cva(
  "focus:ring-ring inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent shadow ",
        secondary: "border-transparent",
        destructive: "border-transparent shadow",
        outline: "text-foreground",
      },
      colour: {
        blue: "bg-blue-400 text-blue-950 hover:bg-blue-400/80",
        green: "bg-emerald-400 text-emerald-950 hover:bg-emerald-500/80",
        transparent:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
      },
    },
    defaultVariants: {
      variant: "default",
      colour: "default",
    },
  }
);

export type Color = VariantProps<typeof badgeVariants>["colour"];

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({className, variant, colour, ...props}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({variant, colour}), className)}
      {...props}
    />
  );
}

export {Badge, badgeVariants};
