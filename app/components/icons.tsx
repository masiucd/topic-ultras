import {
  ArrowBigLeft,
  ArrowBigRight,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Eraser,
  FileDown,
  type LucideProps,
  Pen,
  Search,
  Settings2,
  Tag,
} from "lucide-react";

export const ICON_SIZE = 18;

export const Icons = Object.freeze({
  RightArrow: (props: LucideProps) => (
    <ArrowRight size={ICON_SIZE} {...props} />
  ),
  LeftArrow: (props: LucideProps) => <ArrowLeft size={ICON_SIZE} {...props} />,
  BigRightArrow: (props: LucideProps) => (
    <ArrowBigRight size={ICON_SIZE} {...props} />
  ),
  BigLeftArrow: (props: LucideProps) => (
    <ArrowBigLeft size={ICON_SIZE} {...props} />
  ),
  ChevronRight: (props: LucideProps) => (
    <ChevronRight size={ICON_SIZE} {...props} />
  ),
  ChevronLeft: (props: LucideProps) => (
    <ChevronLeft size={ICON_SIZE} {...props} />
  ),
  ChevronsLeft: (props: LucideProps) => (
    <ChevronsLeft size={ICON_SIZE} {...props} />
  ),
  Check: (props: LucideProps) => <Check size={ICON_SIZE} {...props} />,
  ChevronsRight: (props: LucideProps) => (
    <ChevronsRight size={ICON_SIZE} {...props} />
  ),
  Edit: (props: LucideProps) => <Pen size={ICON_SIZE} {...props} />,
  Category: (props: LucideProps) => <Tag size={ICON_SIZE} {...props} />,
  Download: (props: LucideProps) => <FileDown size={ICON_SIZE} {...props} />,
  Settings: (props: LucideProps) => <Settings2 size={ICON_SIZE} {...props} />,
  UpDown: (props: LucideProps) => (
    <ChevronsUpDown size={ICON_SIZE} {...props} />
  ),
  Eraser: (props: LucideProps) => <Eraser size={ICON_SIZE} {...props} />,
  Search: (props: LucideProps) => <Search size={ICON_SIZE} {...props} />,
});
