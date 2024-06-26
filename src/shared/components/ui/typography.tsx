import {Heading, type HeadingProps} from "@radix-ui/themes";

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
