// utils/animations.ts
import type { Variants, Transition, TargetAndTransition } from "framer-motion";

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    } satisfies Transition,
  },
};

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      // FIX: use a bezier array (type-safe) instead of a string
      ease: [0.22, 1, 0.36, 1],
    } satisfies Transition,
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      // FIX: same here
      ease: [0.22, 1, 0.36, 1],
    } satisfies Transition,
  },
  hover: {
    y: -5,
    transition: { duration: 0.2 } satisfies Transition,
  },
};

// A small explicit type for the function-based variant:
type TechChipVariants = {
  hidden: TargetAndTransition;
  visible: (i: number) => TargetAndTransition;
  hover: TargetAndTransition;
};

export const techChipVariants: TechChipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      // FIX: bezier instead of string
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  hover: {
    scale: 1.1,
    transition: { duration: 0.2 },
  },
};
