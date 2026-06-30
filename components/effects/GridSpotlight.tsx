/**
 * @file components/effects/GridSpotlight.tsx
 * Mouse-following grid highlight on desktop. Updates CSS variables that
 * drive the spotlight overlay in globals.css. Disabled on touch and
 * when the user prefers reduced motion.
 */
"use client";

import { useEffect } from "react";

/** Returns true when spotlight effects are appropriate for this device. */
function canUseGridSpotlight(): boolean {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Tracks pointer position and toggles the grid spotlight overlay. */
export function GridSpotlight() {
  useEffect(() => {
    const root = document.documentElement;
    const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let active = false;
    let frame = 0;
    let x = 0;
    let y = 0;

    /** Writes spotlight position and visibility to CSS custom properties. */
    const paint = () => {
      frame = 0;
      root.style.setProperty("--spotlight-x", `${x}px`);
      root.style.setProperty("--spotlight-y", `${y}px`);
      root.style.setProperty("--spotlight-opacity", "1");
    };

    /** Batches position updates to one frame per pointer move. */
    const schedulePaint = () => {
      if (!frame) {
        frame = requestAnimationFrame(paint);
      }
    };

    /** Updates spotlight position from mouse movement. */
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      schedulePaint();
    };

    /** Hides spotlight when the pointer leaves the document. */
    const onLeave = (event: MouseEvent) => {
      if (event.relatedTarget !== null) return;
      root.style.setProperty("--spotlight-opacity", "0");
    };

    /** Attaches pointer listeners and shows the spotlight. */
    const enable = () => {
      if (active) return;
      active = true;
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("mouseout", onLeave);
    };

    /** Removes listeners and hides the spotlight. */
    const disable = () => {
      if (!active) return;
      active = false;
      cancelAnimationFrame(frame);
      frame = 0;
      root.style.setProperty("--spotlight-opacity", "0");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onLeave);
    };

    /** Enables or disables based on device capabilities and motion preference. */
    const sync = () => {
      if (canUseGridSpotlight()) {
        enable();
      } else {
        disable();
      }
    };

    hoverCapable.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);
    sync();

    return () => {
      hoverCapable.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
      disable();
      root.style.removeProperty("--spotlight-x");
      root.style.removeProperty("--spotlight-y");
      root.style.removeProperty("--spotlight-opacity");
    };
  }, []);

  return null;
}
