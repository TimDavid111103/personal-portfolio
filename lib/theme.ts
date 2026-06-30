/**
 * @file lib/theme.ts
 * Light/dark theme persistence and React subscription helpers.
 *
 * Theme is applied via a `dark` class on `<html>`. A blocking script in
 * layout.tsx runs before paint; Navbar reads state through useSyncExternalStore.
 */

/** localStorage key for persisted light/dark preference. */
export const THEME_STORAGE_KEY = "theme";

/** Runs before paint to apply saved or system theme without a flash. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(t==="dark"||(!t&&d))document.documentElement.classList.add("dark")}catch(e){}})()`;

/** Reads whether the document root is in dark mode. */
export function getThemeSnapshot(): boolean {
  return document.documentElement.classList.contains("dark");
}

/** Server render assumes light mode; blocking script corrects before hydration. */
export function getThemeServerSnapshot(): boolean {
  return false;
}

/** Notifies React when theme class or related preferences change. */
export function subscribeToTheme(onStoreChange: () => void): () => void {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const observer = new MutationObserver(onStoreChange);

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  media.addEventListener("change", onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

/** Applies theme to the document and persists the choice. */
export function setTheme(isDark: boolean): void {
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
}

/** Flips between light and dark mode. */
export function toggleTheme(): void {
  setTheme(!getThemeSnapshot());
}
