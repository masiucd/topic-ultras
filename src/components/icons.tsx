import {ArrowLeft, ArrowRight, type LucideProps} from "lucide-react";

const DEFAULT_SIZE = 16;
export let Icons = {
  ArrowRight: (props: LucideProps) => (
    <ArrowRight
      size={DEFAULT_SIZE}
      strokeWidth={2}
      aria-hidden="true"
      {...props}
    />
  ),
  ArrowLeft: (props: LucideProps) => (
    <ArrowLeft
      size={DEFAULT_SIZE}
      strokeWidth={2}
      aria-hidden="true"
      {...props}
    />
  ),
};
