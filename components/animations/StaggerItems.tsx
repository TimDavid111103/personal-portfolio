"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type StaggerItemsProps = {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
};

/** Staggered entrance for a list of children — theme-neutral alternative to AnimatedList. */
export function StaggerItems({
  children,
  className,
  itemClassName,
  staggerDelay = 0.08,
}: StaggerItemsProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className}>
        {children.map((child, index) => (
          <div key={index} className={itemClassName}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          className={itemClassName}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
