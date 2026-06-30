"use client";

import StackIcon from "tech-stack-icons";
import { useSyncExternalStore } from "react";
import {
  getThemeServerSnapshot,
  getThemeSnapshot,
  subscribeToTheme,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

type StackIconWrapperProps = {
  name: string;
  label: string;
  size?: number;
  className?: string;
};

/** Tech-stack icon that follows the site light/dark theme. */
export function StackIconWrapper({
  name,
  label,
  size = 32,
  className,
}: StackIconWrapperProps) {
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  return (
    <StackIcon
      name={name as never}
      variant={isDark ? "dark" : "light"}
      className={cn("shrink-0", className)}
      style={{ width: size, height: size }}
      aria-label={label}
    />
  );
}
