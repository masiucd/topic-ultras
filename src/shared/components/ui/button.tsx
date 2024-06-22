"use client";
import React from "react";
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  composeRenderProps,
} from "react-aria-components";
import {tv} from "tailwind-variants";

export interface ButtonProps extends RACButtonProps {
  variant?: "primary" | "secondary" | "destructive" | "icon";
}

let button = tv({
  // extend: focusRing,
  base: "rounded-sm px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
  variants: {
    variant: {
      primary: "",
      secondary: "",
      destructive: "",
      icon: "",
      default: "",
    },
    isDisabled: {
      true: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({...renderProps, variant: props.variant, className}),
      )}
    />
  );
}
