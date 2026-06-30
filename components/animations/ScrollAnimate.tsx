"use client";

import AnimatedContent from "@/components/AnimatedContent";
import type { ComponentProps } from "react";

type ScrollAnimateProps = Omit<
  ComponentProps<typeof AnimatedContent>,
  "container"
> & {
  container?: Element | string | null;
};

/** React Bits AnimatedContent preset for the main scroll pane. */
export function ScrollAnimate({
  container = "#main-scroll",
  distance = 48,
  duration = 0.7,
  threshold = 0.15,
  ease = "power3.out",
  ...props
}: ScrollAnimateProps) {
  return (
    <AnimatedContent
      container={container}
      distance={distance}
      duration={duration}
      threshold={threshold}
      ease={ease}
      {...props}
    />
  );
}
