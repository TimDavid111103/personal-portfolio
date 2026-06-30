/**
 * @file components/layout/MainScrollArea.tsx
 * The scrollable region below the navbar.
 *
 * Fills remaining viewport height (`flex-1 h-0`) and stacks one-screen Section
 * children vertically. Registers with section-scroll.ts for hash navigation.
 */
"use client";

import { useCallback, useEffect, type ReactNode } from "react";
import {
  registerMainScrollElement,
  scrollToSectionHash,
} from "./section-scroll";

type MainScrollAreaProps = {
  children: ReactNode;
};

/** Scrollable main wrapper that owns in-page section navigation. */
export function MainScrollArea({ children }: MainScrollAreaProps) {
  const setMainRef = useCallback((node: HTMLElement | null) => {
    registerMainScrollElement(node);

    if (node && location.hash) {
      scrollToSectionHash(location.hash, "auto");
    }
  }, []);

  useEffect(() => {
    const scrollFromHash = () => {
      if (location.hash) {
        scrollToSectionHash(location.hash, "auto");
      }
    };

    window.addEventListener("hashchange", scrollFromHash);
    return () => {
      window.removeEventListener("hashchange", scrollFromHash);
      registerMainScrollElement(null);
    };
  }, []);

  return (
    <main
      id="main-scroll"
      ref={setMainRef}
      className="scrollbar-none flex h-0 min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain scroll-smooth"
    >
      {children}
    </main>
  );
}
