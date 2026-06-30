"use client";

import Magnet from "@/components/Magnet";
import { useSyncExternalStore } from "react";
import type { ComponentProps, ReactNode } from "react";

function subscribeToPointer() {
  const mq = window.matchMedia("(pointer: fine)");
  const onChange = () => window.dispatchEvent(new Event("pointer-preference"));
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getPointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getPointerServerSnapshot() {
  return false;
}

type MagnetHoverProps = {
  children: ReactNode;
  className?: string;
  magnetStrength?: number;
  padding?: number;
} & Omit<ComponentProps<typeof Magnet>, "children">;

/** Magnet effect that disables on touch/coarse-pointer devices. */
export function MagnetHover({
  children,
  className,
  magnetStrength = 3,
  padding = 60,
  ...props
}: MagnetHoverProps) {
  const hasFinePointer = useSyncExternalStore(
    subscribeToPointer,
    getPointerSnapshot,
    getPointerServerSnapshot
  );

  return (
    <Magnet
      disabled={!hasFinePointer}
      magnetStrength={magnetStrength}
      padding={padding}
      wrapperClassName={className}
      {...props}
    >
      {children}
    </Magnet>
  );
}
