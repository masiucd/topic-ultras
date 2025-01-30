"use client";
import {Strong} from "@/components/typography";
import {motion} from "motion/react";

type Props = {
  feature: string;
};

export function FeatureItem({feature}: Props) {
  return (
    <motion.li
      key={feature}
      className="flex h-42 w-fit items-center justify-center rounded-md border border-foreground bg-card-foreground/5 p-5 shadow-sm"
      initial={{scale: 0}}
      animate={{scale: 1}}
      transition={{duration: 0.25}}
    >
      <Strong>{feature}</Strong>
    </motion.li>
  );
}
