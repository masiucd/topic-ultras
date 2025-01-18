import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  type LucideProps,
  PlusCircle,
  Settings2,
} from "lucide-react";

const DEFAULT_SIZE = 16;
const ARIA_ATTRIBUTES: Pick<
  LucideProps,
  "size" | "strokeWidth" | "aria-hidden"
> = {
  size: DEFAULT_SIZE,
  strokeWidth: 2,
  "aria-hidden": "true",
};
export let Icons = {
  ArrowRight: (props: LucideProps) => (
    <ArrowRight {...ARIA_ATTRIBUTES} {...props} />
  ),
  ArrowLeft: (props: LucideProps) => (
    <ArrowLeft {...ARIA_ATTRIBUTES} {...props} />
  ),
  ChevronRight: (props: LucideProps) => (
    <ChevronRight {...ARIA_ATTRIBUTES} {...props} />
  ),
  ChevronLeft: (props: LucideProps) => (
    <ChevronLeft {...ARIA_ATTRIBUTES} {...props} />
  ),
  ChevronsRight: (props: LucideProps) => (
    <ChevronsRight {...ARIA_ATTRIBUTES} {...props} />
  ),
  ChevronsLeft: (props: LucideProps) => (
    <ChevronsLeft {...ARIA_ATTRIBUTES} {...props} />
  ),
  Settings: (props: LucideProps) => (
    <Settings2 {...ARIA_ATTRIBUTES} {...props} />
  ),
  PlusCircle: (props: LucideProps) => (
    <PlusCircle {...ARIA_ATTRIBUTES} {...props} />
  ),
  Download: (props: LucideProps) => (
    <Download {...ARIA_ATTRIBUTES} {...props} />
  ),
  Check: (props: LucideProps) => <Check {...ARIA_ATTRIBUTES} {...props} />,
};
