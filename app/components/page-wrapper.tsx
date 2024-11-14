import type {PropsWithChildren} from "react";

export default function PageWrapper(props: PropsWithChildren) {
  return <div>{props.children}</div>;
}
