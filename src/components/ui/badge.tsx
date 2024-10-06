import {cn} from "@/lib/utils/cn";
import {type VariantProps, cva} from "class-variance-authority";

let badgeVariants = cva(
  [
    "font-semibold",
    "border",
    "rounded-md",
    "transition-opacity",
    "hover:opacity-80",
    "shadow-sm",
  ],
  {
    variants: {
      variant: {
        default: ["border-transparent", "shadow", "hover:shadow"],
        secondary: [],
        destructive: [],
        outline: [],
        ghost: [
          "bg-transparent",
          "border-transparent",
          "shadow-none",
          "hover:shadow-none",
        ],
      },
      size: {
        default: ["text-xs", "py-1", "px-1"],
        sm: ["text-xs", "py-0.5", "px-1"],
        md: ["text-sm", "py-1", "px-2"],
        lg: ["text-lg", "py-2", "px-4"],
      },
      colors: {
        default: [
          "bg-gray-50",
          "text-gray-900",
          "border-gray-400",
          "hover:bg-gray-200",
          "dark:bg-gray-800",
          "dark:text-gray-50",
          "dark:border-gray-600",
          "dark:hover:bg-gray-700",
        ],
        green: [
          "bg-green-100",
          "text-green-800",
          "border-green-400",
          "hover:bg-green-200",
          "dark:bg-green-800",
          "dark:text-green-50",
          "dark:border-green-600",
          "dark:hover:bg-green-700",
        ],
        red: [
          "bg-red-100",
          "text-red-800",
          "border-red-400",
          "hover:bg-red-200",
          "dark:bg-red-800",
          "dark:text-red-50",
          "dark:border-red-600",
          "dark:hover:bg-red-700",
        ],
        blue: [
          "bg-blue-100",
          "text-blue-800",
          "border-blue-400",
          "hover:bg-blue-200",
          "dark:bg-blue-800",
          "dark:text-blue-50",
          "dark:border-blue-600",
          "dark:hover:bg-blue-700",
        ],
        purple: [
          "bg-purple-100",
          "text-purple-800",
          "border-purple-400",
          "hover:bg-purple-200",
          "dark:bg-purple-800",
          "dark:text-purple-50",
          "dark:border-purple-600",
          "dark:hover:bg-purple-700",
        ],
        orange: [
          "bg-orange-100",
          "text-orange-800",
          "border-orange-400",
          "hover:bg-orange-200",
          "dark:bg-orange-800",
          "dark:text-orange-50",
          "dark:border-orange-600",
          "dark:hover:bg-orange-700",
        ],
        brown: [
          "bg-brown-100",
          "text-brown-800",
          "border-brown-400",
          "hover:bg-brown-200",
          "dark:bg-brown-800",
          "dark:text-brown-50",
          "dark:border-brown-600",
          "dark:hover:bg-brown-700",
        ],
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
