import {cn} from "@/lib/utils/cn";
import {type VariantProps, cva} from "class-variance-authority";

let badgeVariants = cva(
  [
    "font-semibold",
    "border",
    "rounded-sm",
    "transition-opacity",
    "hover:opacity-80",
  ],
  {
    variants: {
      variant: {
        default: [],
        secondary: [],
        destructive: [],
        outline: [],
      },
      size: {
        default: [],
        sm: [],
        md: [],
        lg: [],
      },
      colors: {
        default: [],
        green: [],
        red: [],
        blue: [],
        yellow: [],
        gray: [],
        pink: [],
        purple: [],
        orange: [],
        brown: [],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      colors: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge(props: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({
          variant: props.variant,
          size: props.size,
          colors: props.colors,
        })
      )}
      {...props}
    />
  );
}
