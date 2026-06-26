/**
 * @file components/layout/MainScrollArea.tsx
 * The scrollable region below the navbar.
 *
 * This element is the **scroll pane**: it fills whatever viewport height remains
 * after the navbar (`flex-1 h-0` in a flex column). The user always sees exactly
 * one screen of content at a time; scrolling reveals the next Section below.
 *
 * Registers itself with section-scroll.ts so hash navigation can programmatically
 * scroll to section titles.
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
      // flex-1 h-0 min-h-0 — fill remaining viewport below Navbar (the scroll pane).
      // flex-col — Section children stack vertically, each one screen tall.
      // overflow-y-auto — scroll happens here, not on the document body.
      className="scrollbar-none flex h-0 min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain scroll-smooth"
    >
      {children}
    </main>
  );
}
