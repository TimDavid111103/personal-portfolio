"use client";

import { useEffect } from "react";

function canUseGridSpotlight() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function GridSpotlight() {
  useEffect(() => {
    const root = document.documentElement;
    const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let active = false;
    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      root.style.setProperty("--spotlight-x", `${x}px`);
      root.style.setProperty("--spotlight-y", `${y}px`);
      root.style.setProperty("--spotlight-opacity", "1");
    };

    const schedulePaint = () => {
      if (!frame) {
        frame = requestAnimationFrame(paint);
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      schedulePaint();
    };

    const onLeave = (event: MouseEvent) => {
      if (event.relatedTarget !== null) return;
      root.style.setProperty("--spotlight-opacity", "0");
    };

    const enable = () => {
      if (active) return;
      active = true;
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("mouseout", onLeave);
    };

    const disable = () => {
      if (!active) return;
      active = false;
      cancelAnimationFrame(frame);
      frame = 0;
      root.style.setProperty("--spotlight-opacity", "0");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onLeave);
    };

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
