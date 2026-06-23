/**
 * @file components/layout/MainScrollArea.tsx
 * The page's scrollable main region. Registers itself for hash-based
 * section navigation and restores scroll position on load/hash change.
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
  /** Registers this element as the scroll container and jumps to hash on mount. */
  const setMainRef = useCallback((node: HTMLElement | null) => {
    registerMainScrollElement(node);

    if (node && location.hash) {
      scrollToSectionHash(location.hash, "auto");
    }
  }, []);

  /** Re-scrolls when the URL hash changes; unregisters on unmount. */
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
      ref={setMainRef}
      className="scrollbar-none flex h-0 min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain scroll-smooth"
    >
      {children}
    </main>
  );
}
