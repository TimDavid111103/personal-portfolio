"use client";

import { useCallback, useEffect, type ReactNode } from "react";
import {
  registerMainScrollElement,
  scrollToSectionHash,
} from "@/lib/section-scroll";

type MainScrollAreaProps = {
  children: ReactNode;
};

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
      ref={setMainRef}
      className="scrollbar-none flex h-0 min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain scroll-smooth"
    >
      {children}
    </main>
  );
}
