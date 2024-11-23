import {
  ArrowBigLeft,
  ArrowBigRight,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileDown,
  type LucideProps,
  Settings2,
  Tag,
} from "lucide-react";

export const ICON_SIZE = 16;

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
  ChevronsRight: (props: LucideProps) => (
    <ChevronsRight size={ICON_SIZE} {...props} />
  ),
  Category: (props: LucideProps) => <Tag size={ICON_SIZE} {...props} />,
  Download: (props: LucideProps) => <FileDown size={ICON_SIZE} {...props} />,
  Settings: (props: LucideProps) => <Settings2 size={ICON_SIZE} {...props} />,
});
