import {
  Apple,
  Badge,
  Beef,
  CopyIcon,
  Droplet,
  Flame,
  type LucideProps,
  Scale,
  Search,
  Star,
  StarHalf,
  Zap,
} from "lucide-react";

const ICON_SIZE = 16;
export let Icons = Object.freeze({
  Food: (props: LucideProps) => <Apple {...props} size={ICON_SIZE} />,
  Protein: (props: LucideProps) => <Beef {...props} size={ICON_SIZE} />,
  Copy: (props: LucideProps) => <CopyIcon {...props} size={ICON_SIZE} />,
  Fat: (props: LucideProps) => <Droplet {...props} size={ICON_SIZE} />,
  Calories: (props: LucideProps) => <Flame {...props} size={ICON_SIZE} />,
  Scale: (props: LucideProps) => <Scale {...props} size={ICON_SIZE} />,
  Search: (props: LucideProps) => <Search {...props} size={ICON_SIZE} />,
  Star: (props: LucideProps) => <Star {...props} size={ICON_SIZE} />,
  StarHalf: (props: LucideProps) => <StarHalf {...props} size={ICON_SIZE} />,
  Carbs: (props: LucideProps) => <Zap {...props} size={ICON_SIZE} />,
  Label: (props: LucideProps) => <Badge {...props} size={ICON_SIZE} />,
});
