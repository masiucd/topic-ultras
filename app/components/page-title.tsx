import type {PropsWithChildren, ReactNode} from "react";
import {H1, Lead} from "./ui/typography";

export function PageTitle({
  h1Text,
  leadText,
  h1Component = null,
  leadComponent = null,
  children,
}: PropsWithChildren<{
  h1Text: string;
  leadText: string;
  h1Component?: ReactNode | null;
  leadComponent?: ReactNode | null;
}>) {
  if (children) {
    return <aside className="mb-5">{children}</aside>;
  }
  return (
    <aside className="mb-5 flex flex-col gap-1">
      <H1>
        {h1Text}
        {h1Component}
      </H1>
      <Lead>
        {leadText}
        {leadComponent}
      </Lead>
    </aside>
  );
}
