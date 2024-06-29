import {
  Heading,
  type HeadingProps,
  Strong as RadixStrong,
  type StrongProps,
  Text,
  type TextProps,
} from "@radix-ui/themes";

import {cn} from "@/shared/lib/cn";

export function H1(props: HeadingProps) {
  return <Heading weight="bold" size="9" as="h1" {...props} />;
}

export function H2(props: HeadingProps) {
  return <Heading weight="bold" size="8" as="h2" {...props} />;
}

export function H3(props: HeadingProps) {
  return <Heading weight="bold" size="7" as="h3" {...props} />;
}

export function H4(props: HeadingProps) {
  return <Heading weight="bold" size="6" as="h4" {...props} />;
}

export function H5(props: HeadingProps) {
  return <Heading weight="bold" size="5" as="h5" {...props} />;
}

export function H6(props: HeadingProps) {
  return <Heading weight="bold" size="4" as="h6" {...props} />;
}

export function P(props: TextProps) {
  return <Text size="4" as="p" {...props} />;
}

export function Span(props: TextProps) {
  return <Text as="span" {...props} />;
}

export function Label(props: TextProps) {
  return (
    <Text
      className={cn("block text-sm font-medium", props.className)}
      as="label"
      {...props}
    />
  );
}

export function Strong(props: StrongProps) {
  return <RadixStrong {...props} />;
}
